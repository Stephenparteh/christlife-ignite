import type { Request, Response } from "express";
import mongoose from "mongoose";
import { GivingRequest } from "../models/GivingRequest";
import { GivingMethod } from "../models/GivingMethod";
import {
  givingRequestCreateSchema,
  givingRequestUpdateSchema,
  givingRequestListQuerySchema,
} from "../validators/givingRequest";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { firstZodIssueMessage } from "../utils/zodError";

const DUPLICATE_WINDOW_MS = 10 * 60 * 1000;

const escapeRegex = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/**
 * Public. Only whitelisted fields survive validation, the method is
 * verified against the database, and status is always set to "pending"
 * here — never taken from the client. The response carries no PII echo and
 * no admin fields.
 */
export const createRequest = asyncHandler(async (req: Request, res: Response) => {
  const parsed = givingRequestCreateSchema.safeParse(req.body);
  if (!parsed.success) throw new ApiError(400, firstZodIssueMessage(parsed.error));
  const input = parsed.data;

  if (!mongoose.Types.ObjectId.isValid(input.preferredMethodId)) {
    throw new ApiError(400, "preferredMethodId: Choose a valid giving method.");
  }
  const method = await GivingMethod.findOne({ _id: input.preferredMethodId, isActive: true });
  if (!method) {
    throw new ApiError(400, "preferredMethodId: That giving method isn't available.");
  }

  // Idempotency: an identical, recent, still-pending request (double click,
  // retry after a flaky network) is returned instead of stored twice. It is
  // genuinely persisted, so reporting success is truthful.
  const duplicate = await GivingRequest.findOne({
    phone: input.phone,
    amount: input.amount,
    currency: input.currency,
    purpose: input.purpose,
    preferredMethodId: method._id,
    status: "pending",
    createdAt: { $gte: new Date(Date.now() - DUPLICATE_WINDOW_MS) },
  }).select("_id status");
  if (duplicate) {
    res.status(200).json({
      success: true,
      message: "Your giving request has been received.",
      data: { id: duplicate.id, status: duplicate.status },
    });
    return;
  }

  const created = await GivingRequest.create({
    ...input,
    preferredMethodId: method._id,
    preferredMethodName: method.name,
    status: "pending",
  });

  res.status(201).json({
    success: true,
    message: "Your giving request has been received.",
    data: { id: created.id, status: created.status },
  });
});

export const listRequests = asyncHandler(async (req: Request, res: Response) => {
  const parsed = givingRequestListQuerySchema.safeParse(req.query);
  if (!parsed.success) throw new ApiError(400, firstZodIssueMessage(parsed.error));
  const { page, limit, q, status, purpose, methodId, sort } = parsed.data;

  const filter: Record<string, unknown> = {};
  if (status) filter.status = status;
  if (purpose) filter.purpose = purpose;
  if (methodId) {
    if (!mongoose.Types.ObjectId.isValid(methodId)) throw new ApiError(400, "methodId: Invalid id.");
    filter.preferredMethodId = new mongoose.Types.ObjectId(methodId);
  }
  if (q) {
    const rx = new RegExp(escapeRegex(q), "i");
    filter.$or = [{ fullName: rx }, { phone: rx }, { email: rx }];
  }

  const [items, total, grouped] = await Promise.all([
    GivingRequest.find(filter)
      .sort({ createdAt: sort === "asc" ? 1 : -1 })
      .skip((page - 1) * limit)
      .limit(limit),
    GivingRequest.countDocuments(filter),
    // Unfiltered counts so the dashboard tiles always show the whole picture.
    GivingRequest.aggregate<{ _id: string; count: number }>([{ $group: { _id: "$status", count: { $sum: 1 } } }]),
  ]);

  const stats = { total: 0, pending: 0, contacted: 0, completed: 0, closed: 0 };
  for (const g of grouped) {
    if (g._id in stats) stats[g._id as keyof typeof stats] = g.count;
    stats.total += g.count;
  }

  res.json({
    items,
    pagination: { page, limit, total, totalPages: Math.max(1, Math.ceil(total / limit)) },
    stats,
  });
});

export const getRequest = asyncHandler(async (req: Request, res: Response) => {
  const item = await GivingRequest.findById(req.params.id);
  if (!item) throw new ApiError(404, "Giving request not found.");
  res.json({ item });
});

export const updateRequest = asyncHandler(async (req: Request, res: Response) => {
  const parsed = givingRequestUpdateSchema.safeParse(req.body);
  if (!parsed.success) throw new ApiError(400, firstZodIssueMessage(parsed.error));

  const item = await GivingRequest.findById(req.params.id);
  if (!item) throw new ApiError(404, "Giving request not found.");

  const { status, adminNotes } = parsed.data;
  if (adminNotes !== undefined) item.adminNotes = adminNotes;
  if (status !== undefined && status !== item.status) {
    item.status = status;
    // Stamp on entering the state; earlier stamps are never cleared, so
    // moving a request back keeps its history.
    if (status === "contacted") item.contactedAt = new Date();
    if (status === "completed") item.completedAt = new Date();
  }
  await item.save();
  res.json({ item });
});

export const deleteRequest = asyncHandler(async (req: Request, res: Response) => {
  const item = await GivingRequest.findByIdAndDelete(req.params.id);
  if (!item) throw new ApiError(404, "Giving request not found.");
  res.json({ message: "Deleted." });
});

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
import { DEFAULT_GIVING_METHODS, buildMethodOptions, findDefaultMethod, normalizeMethodName } from "../utils/givingMethodOptions";

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

  // preferredMethodId is either a recognized default key ("paypal") or the
  // id of an ACTIVE custom method. Anything else is rejected.
  let methodId: mongoose.Types.ObjectId | null = null;
  let methodName: string;
  const defaultMethod = findDefaultMethod(input.preferredMethodId);
  if (defaultMethod) {
    methodName = defaultMethod.label;
    // If the admin configured a method with this same name, link to it.
    const active = await GivingMethod.find({ isActive: true }).select("name");
    const linked = active.find((m) => normalizeMethodName(m.name) === normalizeMethodName(defaultMethod.label));
    if (linked) {
      methodId = linked._id;
      methodName = linked.name;
    }
  } else if (mongoose.Types.ObjectId.isValid(input.preferredMethodId)) {
    const method = await GivingMethod.findOne({ _id: input.preferredMethodId, isActive: true });
    if (!method) {
      throw new ApiError(400, "preferredMethodId: That giving method isn't available.");
    }
    methodId = method._id;
    methodName = method.name;
  } else {
    throw new ApiError(400, "preferredMethodId: Choose a valid giving method.");
  }

  // Idempotency: an identical, recent, still-pending request (double click,
  // retry after a flaky network) is returned instead of stored twice. It is
  // genuinely persisted, so reporting success is truthful.
  const duplicate = await GivingRequest.findOne({
    phone: input.phone,
    amount: input.amount,
    currency: input.currency,
    purpose: input.purpose,
    preferredMethodName: methodName,
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
    preferredMethodId: methodId,
    preferredMethodName: methodName,
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
    const defaultMethod = findDefaultMethod(methodId);
    if (defaultMethod) {
      // Defaults have no record to point at (and may also be linked to a
      // same-named custom method), so match on the saved name snapshot.
      filter.preferredMethodName = new RegExp(`^${escapeRegex(defaultMethod.label)}$`, "i");
    } else if (mongoose.Types.ObjectId.isValid(methodId)) {
      const methodDoc = await GivingMethod.findById(methodId).select("name");
      const sameNameDefault = methodDoc
        ? DEFAULT_GIVING_METHODS.find((d) => normalizeMethodName(d.label) === normalizeMethodName(methodDoc.name))
        : undefined;
      filter.$and = [
        {
          $or: [
            { preferredMethodId: new mongoose.Types.ObjectId(methodId) },
            // Earlier requests for this same-named default, made before it was configured.
            ...(sameNameDefault ? [{ preferredMethodName: new RegExp(`^${escapeRegex(sameNameDefault.label)}$`, "i") }] : []),
          ],
        },
      ];
    } else {
      throw new ApiError(400, "methodId: Invalid id.");
    }
  }
  if (q) {
    const rx = new RegExp(escapeRegex(q), "i");
    const or: Record<string, unknown>[] = [{ fullName: rx }, { phone: rx }, { email: rx }];
    // Reference lookup: "GR-1A2B3C4D5E" matches the last 10 hex chars of the id.
    const ref = /^(?:GR-?)?([0-9a-f]{6,10})$/i.exec(q);
    if (ref) {
      or.push({ $expr: { $regexMatch: { input: { $toString: "$_id" }, regex: `${ref[1]}$`, options: "i" } } });
    }
    filter.$or = or;
  }

  const [items, total, grouped, customMethods] = await Promise.all([
    GivingRequest.find(filter)
      .sort({ createdAt: sort === "asc" ? 1 : -1 })
      .skip((page - 1) * limit)
      .limit(limit),
    GivingRequest.countDocuments(filter),
    // Unfiltered counts so the dashboard tiles always show the whole picture.
    GivingRequest.aggregate<{ _id: string; count: number }>([{ $group: { _id: "$status", count: { $sum: 1 } } }]),
    // For the dashboard's method filter: defaults + every custom method (incl. inactive).
    GivingMethod.find().sort({ sortOrder: 1, createdAt: 1 }).select("name"),
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
    methodOptions: buildMethodOptions(customMethods.map((m) => ({ id: m.id as string, name: m.name }))),
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

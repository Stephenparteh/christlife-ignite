import type { Request, Response } from "express";
import mongoose from "mongoose";
import { GivingMethod } from "../models/GivingMethod";
import {
  givingMethodCreateSchema,
  givingMethodUpdateSchema,
  givingMethodReorderSchema,
} from "../validators/givingMethod";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { firstZodIssueMessage } from "../utils/zodError";

const SORT = { sortOrder: 1, createdAt: 1 } as const;

/** Public: only active methods, only the fields the Giving page needs. */
export const listPublicMethods = asyncHandler(async (_req: Request, res: Response) => {
  const docs = await GivingMethod.find({ isActive: true }).sort(SORT);
  const items = docs.map((m) => ({
    id: m.id as string,
    name: m.name,
    type: m.type,
    description: m.description,
    instructions: m.instructions,
    details: m.details.map((d) => ({ label: d.label, value: d.value })),
    imageUrl: m.imageUrl,
  }));
  res.json({ items });
});

export const listMethods = asyncHandler(async (_req: Request, res: Response) => {
  const items = await GivingMethod.find().sort(SORT);
  res.json({ items });
});

export const getMethod = asyncHandler(async (req: Request, res: Response) => {
  const item = await GivingMethod.findById(req.params.id);
  if (!item) throw new ApiError(404, "Giving method not found.");
  res.json({ item });
});

export const createMethod = asyncHandler(async (req: Request, res: Response) => {
  const parsed = givingMethodCreateSchema.safeParse(req.body);
  if (!parsed.success) throw new ApiError(400, firstZodIssueMessage(parsed.error));

  const data = { ...parsed.data };
  if (data.sortOrder === undefined) {
    const last = await GivingMethod.findOne().sort({ sortOrder: -1 }).select("sortOrder");
    data.sortOrder = last ? last.sortOrder + 1 : 0;
  }
  const item = await GivingMethod.create(data);
  res.status(201).json({ item });
});

export const updateMethod = asyncHandler(async (req: Request, res: Response) => {
  const parsed = givingMethodUpdateSchema.safeParse(req.body);
  if (!parsed.success) throw new ApiError(400, firstZodIssueMessage(parsed.error));

  const item = await GivingMethod.findByIdAndUpdate(req.params.id, parsed.data, {
    new: true,
    runValidators: true,
  });
  if (!item) throw new ApiError(404, "Giving method not found.");
  res.json({ item });
});

/** Persists a full ordering: ids[0] gets sortOrder 0, ids[1] gets 1, … */
export const reorderMethods = asyncHandler(async (req: Request, res: Response) => {
  const parsed = givingMethodReorderSchema.safeParse(req.body);
  if (!parsed.success) throw new ApiError(400, firstZodIssueMessage(parsed.error));
  const { ids } = parsed.data;
  if (!ids.every((id) => mongoose.Types.ObjectId.isValid(id)) || new Set(ids).size !== ids.length) {
    throw new ApiError(400, "ids: Invalid list of ids.");
  }

  await GivingMethod.bulkWrite(
    ids.map((id, index) => ({
      updateOne: { filter: { _id: id }, update: { $set: { sortOrder: index } } },
    })),
  );
  const items = await GivingMethod.find().sort(SORT);
  res.json({ items });
});

export const deleteMethod = asyncHandler(async (req: Request, res: Response) => {
  // Existing GivingRequests keep their preferredMethodName snapshot, so
  // deleting a method never orphans or rewrites history.
  const item = await GivingMethod.findByIdAndDelete(req.params.id);
  if (!item) throw new ApiError(404, "Giving method not found.");
  res.json({ message: "Deleted." });
});

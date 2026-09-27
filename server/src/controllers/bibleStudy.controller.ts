import type { Request, Response } from "express";
import { BibleStudy, BIBLE_STUDY_SINGLETON_ID } from "../models/BibleStudy";
import { bibleStudyUpdateSchema } from "../validators/bibleStudy";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";

/**
 * Singleton "get or create" — there is exactly one Bible Study document
 * (fixed _id), auto-created with empty defaults the first time anyone
 * asks for it. In practice `npm run seed-content` creates it with real
 * values before anyone hits this in production, but the fallback keeps
 * a fresh/empty database from 404ing instead of quietly working.
 */
const getOrCreate = () =>
  BibleStudy.findByIdAndUpdate(
    BIBLE_STUDY_SINGLETON_ID,
    { $setOnInsert: { _id: BIBLE_STUDY_SINGLETON_ID } },
    { new: true, upsert: true },
  );

export const getBibleStudy = asyncHandler(async (_req: Request, res: Response) => {
  const doc = await getOrCreate();
  res.json({ bibleStudy: doc });
});

export const updateBibleStudy = asyncHandler(async (req: Request, res: Response) => {
  const parsed = bibleStudyUpdateSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new ApiError(400, parsed.error.issues[0]?.message ?? "Invalid request.");
  }

  await getOrCreate();
  const doc = await BibleStudy.findByIdAndUpdate(BIBLE_STUDY_SINGLETON_ID, parsed.data, {
    new: true,
    runValidators: true,
  });
  res.json({ bibleStudy: doc });
});

import type { Request, Response } from "express";
import { SiteSettings, SITE_SETTINGS_SINGLETON_ID } from "../models/SiteSettings";
import { siteSettingsUpdateSchema } from "../validators/settings";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";

const getOrCreate = () =>
  SiteSettings.findByIdAndUpdate(
    SITE_SETTINGS_SINGLETON_ID,
    { $setOnInsert: { _id: SITE_SETTINGS_SINGLETON_ID } },
    { new: true, upsert: true },
  );

export const getSettings = asyncHandler(async (_req: Request, res: Response) => {
  const doc = await getOrCreate();
  res.json({ settings: doc });
});

export const updateSettings = asyncHandler(async (req: Request, res: Response) => {
  const parsed = siteSettingsUpdateSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new ApiError(400, parsed.error.issues[0]?.message ?? "Invalid request.");
  }

  await getOrCreate();
  const doc = await SiteSettings.findByIdAndUpdate(SITE_SETTINGS_SINGLETON_ID, parsed.data, {
    new: true,
    runValidators: true,
  });
  res.json({ settings: doc });
});

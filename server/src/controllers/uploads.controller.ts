import type { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { uploadFile, type UploadFolder } from "../services/uploadService";
import { env } from "../config/env";

const ALLOWED_FOLDERS: UploadFolder[] = ["events", "gallery", "gallery-thumbnails", "team"];

const IMAGE_MIME_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const VIDEO_MIME_TYPES = new Set(["video/mp4", "video/webm", "video/quicktime"]);

/**
 * POST /api/uploads?folder=events&type=image
 * multipart/form-data, field name "file". Authenticated only (mounted with
 * requireAuth in routes/uploads.routes.ts) — there is no public upload
 * endpoint.
 */
export const createUpload = asyncHandler(async (req: Request, res: Response) => {
  const file = req.file;
  if (!file) {
    throw new ApiError(400, "No file was uploaded.");
  }

  const folder = req.query.folder;
  if (typeof folder !== "string" || !ALLOWED_FOLDERS.includes(folder as UploadFolder)) {
    throw new ApiError(400, `folder must be one of: ${ALLOWED_FOLDERS.join(", ")}.`);
  }

  const isImage = IMAGE_MIME_TYPES.has(file.mimetype);
  const isVideo = VIDEO_MIME_TYPES.has(file.mimetype);
  if (!isImage && !isVideo) {
    throw new ApiError(
      400,
      "Unsupported file type. Use JPEG, PNG, WEBP, or GIF for images, or MP4, WEBM, or MOV for video.",
    );
  }

  const maxMb = isImage ? env.MAX_UPLOAD_IMAGE_MB : env.MAX_UPLOAD_VIDEO_MB;
  if (file.size > maxMb * 1024 * 1024) {
    throw new ApiError(400, `File is too large. The limit is ${maxMb}MB for ${isImage ? "images" : "video"}.`);
  }

  const result = await uploadFile(file.buffer, file.originalname, folder as UploadFolder, isImage ? "image" : "video");
  res.status(201).json(result);
});

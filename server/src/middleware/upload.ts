import multer from "multer";
import { env } from "../config/env";

/** Multer reads the whole file into memory (fine at these size limits) so uploadService can hand the buffer straight to Cloudinary or disk — no temp files to clean up. */
export const uploadMiddleware = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: Math.max(env.MAX_UPLOAD_IMAGE_MB, env.MAX_UPLOAD_VIDEO_MB) * 1024 * 1024 },
}).single("file");

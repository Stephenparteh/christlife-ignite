import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { v2 as cloudinary } from "cloudinary";
import { env } from "../config/env";
import { ApiError } from "../utils/ApiError";

/**
 * Media storage, in one place, with two modes:
 *
 *  - Cloudinary, when CLOUDINARY_CLOUD_NAME/API_KEY/API_SECRET are set.
 *    This is the real, production-appropriate path — durable storage with
 *    a stable public URL, independent of this server's own filesystem.
 *
 *  - A local-disk fallback under server/uploads/, used ONLY outside
 *    production (NODE_ENV !== "production") when Cloudinary isn't
 *    configured — enough to develop and test the upload feature without
 *    needing a real account yet. It is never used to mask a missing
 *    Cloudinary in production: most production hosts have an ephemeral or
 *    read-only filesystem, so pretending this is "good enough" there would
 *    silently lose every uploaded file on the next deploy/restart. In
 *    production without Cloudinary configured, uploads are refused with a
 *    clear error instead.
 *
 * Either way, nothing here ever reports success without a file actually
 * having been written somewhere retrievable.
 */

if (env.HAS_CLOUDINARY) {
  cloudinary.config({
    cloud_name: env.CLOUDINARY_CLOUD_NAME,
    api_key: env.CLOUDINARY_API_KEY,
    api_secret: env.CLOUDINARY_API_SECRET,
    secure: true,
  });
}

export type UploadFolder = "events" | "gallery" | "gallery-thumbnails" | "team";

export interface UploadedFile {
  url: string;
}

const LOCAL_UPLOAD_ROOT = path.resolve(__dirname, "../../uploads");

const uploadToCloudinary = (buffer: Buffer, folder: UploadFolder, resourceType: "image" | "video") =>
  new Promise<UploadedFile>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: `christ-life/${folder}`, resource_type: resourceType },
      (error, result) => {
        if (error || !result) {
          reject(error ?? new Error("Cloudinary upload returned no result."));
          return;
        }
        resolve({ url: result.secure_url });
      },
    );
    stream.end(buffer);
  });

const uploadToLocalDisk = async (
  buffer: Buffer,
  folder: UploadFolder,
  originalName: string,
): Promise<UploadedFile> => {
  const dir = path.join(LOCAL_UPLOAD_ROOT, folder);
  await fs.promises.mkdir(dir, { recursive: true });

  const ext = path.extname(originalName).toLowerCase() || "";
  const filename = `${Date.now()}-${crypto.randomBytes(8).toString("hex")}${ext}`;
  await fs.promises.writeFile(path.join(dir, filename), buffer);

  return { url: `/uploads/${folder}/${filename}` };
};

export const uploadFile = async (
  buffer: Buffer,
  originalName: string,
  folder: UploadFolder,
  resourceType: "image" | "video",
): Promise<UploadedFile> => {
  if (env.HAS_CLOUDINARY) {
    return uploadToCloudinary(buffer, folder, resourceType);
  }

  if (env.IS_PRODUCTION) {
    throw new ApiError(
      503,
      "Media storage isn't configured yet. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET on the server.",
    );
  }

  return uploadToLocalDisk(buffer, folder, originalName);
};

export const LOCAL_UPLOAD_DIR = LOCAL_UPLOAD_ROOT;

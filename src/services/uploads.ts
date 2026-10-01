import { apiUpload } from "@/lib/apiClient";

export type UploadFolder = "events" | "gallery" | "gallery-thumbnails" | "team";

export const uploadsService = {
  upload: (file: File, folder: UploadFolder) => apiUpload("/uploads", file, { folder }),
};

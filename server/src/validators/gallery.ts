import { z } from "zod";

const url = z.string().trim().min(1, "URL is required.").max(2048).refine(
  (value) => /^https?:\/\//i.test(value) || value.startsWith("/"),
  "Must be a full http(s) URL or a site-relative path starting with /.",
);
const urlOrEmpty = z.string().trim().max(2048).refine(
  (value) => value === "" || /^https?:\/\//i.test(value) || value.startsWith("/"),
  "Must be a full http(s) URL or a site-relative path starting with /.",
);

export const galleryItemCreateSchema = z.object({
  type: z.enum(["photo", "video"]),
  title: z.string().trim().min(1, "Title is required.").max(200),
  caption: z.string().trim().max(1000).optional().default(""),
  mediaUrl: url,
  thumbnailUrl: urlOrEmpty.optional().default(""),
  category: z.string().trim().max(200).optional().default(""),
  published: z.boolean().optional().default(true),
});

export const galleryItemUpdateSchema = galleryItemCreateSchema.partial();

export type GalleryItemCreateInput = z.infer<typeof galleryItemCreateSchema>;
export type GalleryItemUpdateInput = z.infer<typeof galleryItemUpdateSchema>;

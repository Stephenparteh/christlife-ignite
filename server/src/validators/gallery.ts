import { z } from "zod";
import { optionalUrlOrPath } from "./shared";

// mediaUrl differs from the shared optionalUrlOrPath: it's required, so it
// doesn't get the "" default — everything else about the check is the same.
const requiredUrlOrPath = z
  .string()
  .trim()
  .min(1, "A URL or site path is required.")
  .max(2048)
  .refine(
    (value) => value.startsWith("/") || /^https?:\/\//i.test(value),
    "Must be a full http(s) URL or a site path starting with /.",
  );

export const galleryItemCreateSchema = z.object({
  type: z.enum(["photo", "video"]),
  title: z.string().trim().min(1, "Title is required.").max(200),
  caption: z.string().trim().max(1000).optional().default(""),
  mediaUrl: requiredUrlOrPath,
  thumbnailUrl: optionalUrlOrPath(),
  category: z.string().trim().max(200).optional().default(""),
  published: z.boolean().optional().default(true),
});

export const galleryItemUpdateSchema = galleryItemCreateSchema.partial();

export type GalleryItemCreateInput = z.infer<typeof galleryItemCreateSchema>;
export type GalleryItemUpdateInput = z.infer<typeof galleryItemUpdateSchema>;

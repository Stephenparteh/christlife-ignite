import { Schema, model, type InferSchemaType, type HydratedDocument } from "mongoose";

const galleryItemSchema = new Schema(
  {
    type: { type: String, enum: ["photo", "video"], required: true },
    title: { type: String, required: true, trim: true },
    caption: { type: String, trim: true, default: "" },
    // Plain URL/reference rather than a binary upload — see server/README.md
    // "Media storage" section for why, and what replaces this later.
    mediaUrl: { type: String, required: true, trim: true },
    thumbnailUrl: { type: String, trim: true, default: "" },
    category: { type: String, trim: true, default: "" },
    published: { type: Boolean, default: true },
  },
  { timestamps: true },
);

galleryItemSchema.index({ published: 1, type: 1, createdAt: -1 });

export type GalleryItemSchemaShape = InferSchemaType<typeof galleryItemSchema>;
export type GalleryItemDocument = HydratedDocument<GalleryItemSchemaShape>;

export const GalleryItem = model("GalleryItem", galleryItemSchema);

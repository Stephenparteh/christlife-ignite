import { Schema, model, type InferSchemaType, type HydratedDocument } from "mongoose";

const contactMessageSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    subject: { type: String, trim: true, default: "" },
    message: { type: String, required: true, trim: true },
    read: { type: Boolean, default: false },
  },
  { timestamps: true },
);

contactMessageSchema.index({ read: 1, createdAt: -1 });

export type ContactMessageSchemaShape = InferSchemaType<typeof contactMessageSchema>;
export type ContactMessageDocument = HydratedDocument<ContactMessageSchemaShape>;

export const ContactMessage = model("ContactMessage", contactMessageSchema);

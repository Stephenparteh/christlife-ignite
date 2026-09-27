import { Schema, model, type InferSchemaType, type HydratedDocument } from "mongoose";

const testimonialSchema = new Schema(
  {
    author: { type: String, required: true, trim: true },
    role: { type: String, trim: true, default: "" },
    quote: { type: String, required: true, trim: true },
    imageUrl: { type: String, trim: true, default: "" },
    published: { type: Boolean, default: true },
  },
  { timestamps: true },
);

testimonialSchema.index({ published: 1, createdAt: -1 });

export type TestimonialSchemaShape = InferSchemaType<typeof testimonialSchema>;
export type TestimonialDocument = HydratedDocument<TestimonialSchemaShape>;

export const Testimonial = model("Testimonial", testimonialSchema);

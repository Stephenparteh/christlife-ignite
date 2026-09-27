import { z } from "zod";

export const testimonialCreateSchema = z.object({
  author: z.string().trim().min(1, "Author is required.").max(200),
  role: z.string().trim().max(200).optional().default(""),
  quote: z.string().trim().min(1, "Quote is required.").max(4000),
  imageUrl: z.string().trim().max(2048).optional().default(""),
  published: z.boolean().optional().default(true),
});

export const testimonialUpdateSchema = testimonialCreateSchema.partial();

export type TestimonialCreateInput = z.infer<typeof testimonialCreateSchema>;
export type TestimonialUpdateInput = z.infer<typeof testimonialUpdateSchema>;

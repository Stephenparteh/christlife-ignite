import { z } from "zod";

export const contactMessageCreateSchema = z.object({
  name: z.string().trim().min(1, "Name is required.").max(200),
  email: z.string().trim().toLowerCase().min(1, "Email is required.").email("Enter a valid email address."),
  subject: z.string().trim().max(200).optional().default(""),
  message: z.string().trim().min(1, "Message is required.").max(4000),
});

export const contactMessageUpdateSchema = z.object({
  read: z.boolean(),
});

export type ContactMessageCreateInput = z.infer<typeof contactMessageCreateSchema>;
export type ContactMessageUpdateInput = z.infer<typeof contactMessageUpdateSchema>;

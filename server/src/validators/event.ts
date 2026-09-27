import { z } from "zod";

const urlOrEmpty = z.string().trim().max(2048).refine(
  (value) => value === "" || /^https?:\/\//i.test(value),
  "Must be a full http(s) URL.",
);

export const eventCreateSchema = z.object({
  title: z.string().trim().min(1, "Title is required.").max(200),
  description: z.string().trim().min(1, "Description is required.").max(4000),
  dateLabel: z.string().trim().min(1, "Date is required.").max(200),
  eventDate: z.coerce.date().nullable().optional(),
  time: z.string().trim().max(200).optional().default(""),
  location: z.string().trim().max(200).optional().default(""),
  category: z.string().trim().max(200).optional().default(""),
  coverImageUrl: urlOrEmpty.optional().default(""),
  link: urlOrEmpty.optional().default(""),
  featured: z.boolean().optional().default(false),
  published: z.boolean().optional().default(true),
});

export const eventUpdateSchema = eventCreateSchema.partial();

export type EventCreateInput = z.infer<typeof eventCreateSchema>;
export type EventUpdateInput = z.infer<typeof eventUpdateSchema>;

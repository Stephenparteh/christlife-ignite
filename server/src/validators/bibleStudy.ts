import { z } from "zod";
import { optionalUrl } from "./shared";

const sessionSchema = z.object({
  day: z.string().trim().min(1, "Day is required.").max(100),
  title: z.string().trim().min(1, "Session title is required.").max(200),
  time: z.string().trim().max(200).optional().default(""),
  platform: z.string().trim().max(200).optional().default(""),
  meetUrl: optionalUrl(),
  whatsappUrl: optionalUrl(),
  description: z.string().trim().max(1000).optional().default(""),
});

export const bibleStudyUpdateSchema = z.object({
  sessions: z.array(sessionSchema).max(14).optional(),
  time: z.string().trim().max(200).optional(),
  platform: z.string().trim().max(200).optional(),
  meetUrl: z.string().trim().max(2048).optional(),
  whatsappUrl: z.string().trim().max(2048).optional(),
  description: z.string().trim().max(2000).optional(),
  published: z.boolean().optional(),
});

export type BibleStudyUpdateInput = z.infer<typeof bibleStudyUpdateSchema>;

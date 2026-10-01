import { z } from "zod";
import { optionalUrl, optionalUrlOrPath } from "./shared";

export const teamMemberCreateSchema = z.object({
  name: z.string().trim().min(1, "Name is required.").max(200),
  role: z.string().trim().max(200).optional().default(""),
  imageUrl: optionalUrlOrPath(),
  bio: z.string().trim().max(2000).optional().default(""),
  facebookUrl: optionalUrl(),
  instagramUrl: optionalUrl(),
  linkedinUrl: optionalUrl(),
  order: z.coerce.number().int().optional().default(0),
  published: z.boolean().optional().default(true),
});

export const teamMemberUpdateSchema = teamMemberCreateSchema.partial();

export type TeamMemberCreateInput = z.infer<typeof teamMemberCreateSchema>;
export type TeamMemberUpdateInput = z.infer<typeof teamMemberUpdateSchema>;

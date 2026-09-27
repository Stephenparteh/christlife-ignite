import { z } from "zod";

export const siteSettingsUpdateSchema = z.object({
  organizationName: z.string().trim().max(200).optional(),
  tagline: z.string().trim().max(300).optional(),
  email: z.string().trim().toLowerCase().max(200).refine(
    (value) => value === "" || z.string().email().safeParse(value).success,
    "Must be a valid email address.",
  ).optional(),
  whatsappDisplay: z.string().trim().max(50).optional(),
  whatsappChannelUrl: z.string().trim().max(2048).optional(),
  facebookUrl: z.string().trim().max(2048).optional(),
});

export type SiteSettingsUpdateInput = z.infer<typeof siteSettingsUpdateSchema>;

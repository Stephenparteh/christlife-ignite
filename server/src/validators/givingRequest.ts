import { z } from "zod";

export const GIVING_PURPOSES = [
  "General Giving",
  "Tithes",
  "Offering",
  "Missions",
  "Building / Development",
  "Community Outreach",
  "Other",
] as const;
export const GIVING_CURRENCIES = ["LRD", "USD"] as const;
export const GIVING_REQUEST_STATUSES = ["pending", "contacted", "completed", "closed"] as const;

// International-friendly: optional +, digits and common separators, 6-15 digits.
const phoneSchema = z
  .string()
  .trim()
  .min(1, "Phone number is required.")
  .max(40)
  .regex(/^\+?[0-9 ()\-.]+$/, "Enter a valid phone number.")
  .refine((v) => {
    const digits = v.replace(/\D/g, "").length;
    return digits >= 6 && digits <= 15;
  }, "Enter a valid phone number.");

const amountSchema = z
  .number({ invalid_type_error: "Enter a valid amount.", required_error: "Amount is required." })
  .finite("Enter a valid amount.")
  .positive("Amount must be greater than zero.")
  .max(1_000_000_000, "Amount is too large.")
  .transform((n) => Math.round(n * 100) / 100)
  .refine((n) => n > 0, "Amount must be greater than zero.");

/**
 * Public input. Anything not listed (status, adminNotes, timestamps, …) is
 * stripped by zod, so a visitor can never set internal fields.
 */
export const givingRequestCreateSchema = z
  .object({
    fullName: z.string().trim().min(1, "Full name is required.").max(200),
    phone: phoneSchema,
    email: z
      .string()
      .trim()
      .toLowerCase()
      .max(254)
      .refine((v) => v === "" || z.string().email().safeParse(v).success, "Enter a valid email address.")
      .optional()
      .default(""),
    purpose: z.enum(GIVING_PURPOSES, { errorMap: () => ({ message: "Choose a giving purpose." }) }),
    customPurpose: z.string().trim().max(200).optional().default(""),
    amount: amountSchema,
    currency: z.enum(GIVING_CURRENCIES, { errorMap: () => ({ message: "Choose a currency." }) }),
    preferredMethodId: z.string().trim().min(1, "Choose a giving method."),
    note: z.string().trim().max(1000).optional().default(""),
  })
  .superRefine((data, ctx) => {
    if (data.purpose === "Other" && !data.customPurpose) {
      ctx.addIssue({ code: "custom", path: ["customPurpose"], message: "Please describe the purpose." });
    }
  })
  .transform((data) => ({ ...data, customPurpose: data.purpose === "Other" ? data.customPurpose : "" }));

/** Admin may only change these two fields. */
export const givingRequestUpdateSchema = z
  .object({
    status: z.enum(GIVING_REQUEST_STATUSES),
    adminNotes: z.string().trim().max(4000),
  })
  .partial()
  .strict();

export const givingRequestListQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  q: z.string().trim().max(100).optional(),
  status: z.enum(GIVING_REQUEST_STATUSES).optional(),
  purpose: z.enum(GIVING_PURPOSES).optional(),
  methodId: z.string().trim().optional(),
  sort: z.enum(["asc", "desc"]).default("desc"),
});

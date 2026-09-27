import { z } from "zod";

/**
 * Login only rejects genuinely malformed input (missing/blank fields, an
 * email that isn't shaped like an email). It deliberately does not enforce
 * a minimum password length here — that would reject an existing
 * administrator's real password if it happens to be short, which isn't
 * this endpoint's job to police. Password strength is enforced once, at
 * account-creation time, in scripts/createAdmin.ts.
 */
export const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required." })
    .trim()
    .toLowerCase()
    .min(1, "Email is required.")
    .email("Enter a valid email address."),
  password: z.string({ required_error: "Password is required." }).min(1, "Password is required."),
});

export type LoginInput = z.infer<typeof loginSchema>;

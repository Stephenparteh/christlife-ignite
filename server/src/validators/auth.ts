import { z } from "zod";
import { BCRYPT_MAX_BYTES } from "../utils/password";

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

export const MIN_NEW_PASSWORD_LENGTH = 8;

/**
 * Password change. The new password has a real minimum here (this is where
 * a password is chosen). The current password is only required to be
 * present — it's checked against the stored hash, not against a policy.
 */
export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string({ required_error: "Current password is required." })
      .min(1, "Current password is required."),
    newPassword: z
      .string({ required_error: "New password is required." })
      .min(MIN_NEW_PASSWORD_LENGTH, `New password must be at least ${MIN_NEW_PASSWORD_LENGTH} characters.`)
      .refine(
        (value) => Buffer.byteLength(value, "utf8") <= BCRYPT_MAX_BYTES,
        `New password must be at most ${BCRYPT_MAX_BYTES} bytes.`,
      ),
  })
  .refine((data) => data.newPassword !== data.currentPassword, {
    message: "New password must be different from the current password.",
    path: ["newPassword"],
  });

export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;

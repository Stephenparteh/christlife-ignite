import type { Request, Response } from "express";
import { Admin } from "../models/Admin";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import { signAuthToken } from "../utils/jwt";
import { setAuthCookie, clearAuthCookie } from "../utils/cookies";
import { loginSchema, changePasswordSchema } from "../validators/auth";
import { hashPassword, verifyPassword } from "../utils/password";
import { firstZodIssueMessage } from "../utils/zodError";

/** Never send more than this back to the browser for an admin. */
const toSafeUser = (admin: { _id: unknown; name: string; email: string; role: string }) => ({
  id: String(admin._id),
  name: admin.name,
  email: admin.email,
  role: admin.role,
});

// One generic message for every login failure mode, deliberately — it must
// not be possible to tell from the response whether the email exists.
const INVALID_CREDENTIALS = "Invalid email or password.";

export const login = asyncHandler(async (req: Request, res: Response) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new ApiError(400, firstZodIssueMessage(parsed.error));
  }
  const { email, password } = parsed.data;

  const admin = await Admin.findOne({ email }).select("+password");
  if (!admin) {
    throw new ApiError(401, INVALID_CREDENTIALS);
  }

  const passwordMatches = await verifyPassword(password, admin.password);
  if (!passwordMatches) {
    throw new ApiError(401, INVALID_CREDENTIALS);
  }

  const token = signAuthToken({ sub: String(admin._id), role: "admin" });
  setAuthCookie(res, token);

  res.json({ user: toSafeUser(admin) });
});

export const logout = asyncHandler(async (_req: Request, res: Response) => {
  clearAuthCookie(res);
  res.json({ message: "Logged out." });
});

/** Mounted behind requireAuth — req.user is guaranteed to be set here. */
export const me = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new ApiError(401, "Not authenticated.");
  }

  const admin = await Admin.findById(req.user.id);
  if (!admin) {
    // The token is valid but the account behind it is gone (e.g. deleted).
    clearAuthCookie(res);
    throw new ApiError(401, "Not authenticated.");
  }

  res.json({ user: toSafeUser(admin) });
});

/**
 * Changes the signed-in admin's password. Only the password field is
 * written — name, email, role and everything else are left alone.
 *
 * Session behaviour: the JWT is stateless, so other browsers/devices that
 * already hold a session cookie stay signed in until it expires
 * (AUTH_SESSION_DAYS). This request's own cookie is cleared so the device
 * that changed the password must sign in again with the new one.
 */
export const changePassword = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new ApiError(401, "Not authenticated.");
  }

  const parsed = changePasswordSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new ApiError(400, firstZodIssueMessage(parsed.error));
  }
  const { currentPassword, newPassword } = parsed.data;

  const admin = await Admin.findById(req.user.id).select("+password");
  if (!admin) {
    clearAuthCookie(res);
    throw new ApiError(401, "Not authenticated.");
  }

  const currentMatches = await verifyPassword(currentPassword, admin.password);
  if (!currentMatches) {
    // Safe to be specific here: the caller is already signed in as this admin.
    throw new ApiError(401, "Current password is incorrect.");
  }

  const passwordHash = await hashPassword(newPassword);
  await Admin.updateOne({ _id: admin._id }, { $set: { password: passwordHash } });

  clearAuthCookie(res);
  res.json({ message: "Password updated. Please sign in again with your new password." });
});

import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { Admin } from "../models/Admin";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import { signAuthToken } from "../utils/jwt";
import { setAuthCookie, clearAuthCookie } from "../utils/cookies";
import { loginSchema } from "../validators/auth";

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
    throw new ApiError(400, parsed.error.issues[0]?.message ?? "Invalid request.");
  }
  const { email, password } = parsed.data;

  const admin = await Admin.findOne({ email }).select("+password");
  if (!admin) {
    throw new ApiError(401, INVALID_CREDENTIALS);
  }

  const passwordMatches = await bcrypt.compare(password, admin.password);
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

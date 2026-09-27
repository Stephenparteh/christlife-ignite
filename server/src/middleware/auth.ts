import type { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError";
import { verifyAuthToken } from "../utils/jwt";
import { AUTH_COOKIE_NAME } from "../utils/cookies";

export interface AuthenticatedUser {
  id: string;
  role: "admin";
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
    }
  }
}

/**
 * Reusable authentication gate. Reads the session cookie, verifies it, and
 * attaches the authenticated identity to `req.user`. Milestone 3's CRUD
 * routes should reuse this instead of re-implementing auth checks.
 */
export const requireAuth = (req: Request, _res: Response, next: NextFunction) => {
  const token = req.cookies?.[AUTH_COOKIE_NAME];

  if (!token || typeof token !== "string") {
    return next(new ApiError(401, "Not authenticated."));
  }

  try {
    const payload = verifyAuthToken(token);
    req.user = { id: payload.sub, role: payload.role };
    next();
  } catch {
    next(new ApiError(401, "Not authenticated."));
  }
};

/**
 * Like requireAuth, but never rejects — it just attaches req.user when a
 * valid session cookie is present, and leaves it undefined otherwise.
 *
 * Used on the CMS's public-facing list/detail GET routes so one endpoint
 * serves both audiences: the public site (no cookie) sees only published
 * content, while the dashboard's own requests (which carry the cookie)
 * transparently see everything, including drafts. See each content
 * controller's list() for where that published-filter decision happens.
 */
export const attachUserIfPresent = (req: Request, _res: Response, next: NextFunction) => {
  const token = req.cookies?.[AUTH_COOKIE_NAME];

  if (token && typeof token === "string") {
    try {
      const payload = verifyAuthToken(token);
      req.user = { id: payload.sub, role: payload.role };
    } catch {
      // Invalid/expired cookie on a public route just means "not logged
      // in" here — there's nothing to reject.
    }
  }

  next();
};

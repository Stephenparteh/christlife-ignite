import type { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError";

interface Bucket {
  count: number;
  resetAt: number;
}

/**
 * Minimal in-memory fixed-window rate limiter — enough to blunt naive
 * password-guessing against a single-process dev/small deployment.
 *
 * This is intentionally simple and has real limits worth knowing about
 * before relying on it in a bigger production deployment: it resets on
 * every restart and isn't shared across multiple server instances. A
 * multi-instance deployment should move this to Redis (or a hosting
 * platform's built-in rate limiting) instead.
 */
export const rateLimit = ({ max, windowMs }: { max: number; windowMs: number }) => {
  const buckets = new Map<string, Bucket>();

  return (req: Request, _res: Response, next: NextFunction) => {
    const key = req.ip ?? "unknown";
    const now = Date.now();
    const bucket = buckets.get(key);

    if (!bucket || bucket.resetAt <= now) {
      buckets.set(key, { count: 1, resetAt: now + windowMs });
      return next();
    }

    bucket.count += 1;

    if (bucket.count > max) {
      return next(new ApiError(429, "Too many attempts. Please try again later."));
    }

    next();
  };
};

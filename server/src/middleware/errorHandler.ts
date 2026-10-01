import type { NextFunction, Request, Response } from "express";
import multer from "multer";
import { ApiError } from "../utils/ApiError";

export const notFoundHandler = (req: Request, res: Response) => {
  res.status(404).json({ message: `No route: ${req.method} ${req.originalUrl}` });
};

/**
 * Centralized error handling. ApiError instances carry a message that's
 * already safe to show the client; anything else (a MongoDB error, a bug,
 * etc.) is logged server-side and replaced with a generic message —
 * stack traces, connection strings, and driver errors never reach the browser.
 */
export const errorHandler = (err: unknown, req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message });
  }

  if (err instanceof multer.MulterError) {
    const message =
      err.code === "LIMIT_FILE_SIZE" ? "That file is too large." : "There was a problem with the upload.";
    return res.status(400).json({ message });
  }

  console.error(`Unhandled error on ${req.method} ${req.originalUrl}:`, err);
  res.status(500).json({ message: "Something went wrong. Please try again." });
};

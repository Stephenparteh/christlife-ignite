import type { ZodError } from "zod";

/**
 * Turns the first validation issue into a client-safe message that names
 * the field it's about — e.g. "coverImageUrl: Must be a full http(s) URL."
 * instead of just "Must be a full http(s) URL.", which reads as if
 * whichever field the admin was just looking at is the one that failed
 * even when a different field is the actual problem.
 */
export const firstZodIssueMessage = (error: ZodError, fallback = "Invalid request.") => {
  const issue = error.issues[0];
  if (!issue) return fallback;
  const path = issue.path.join(".");
  return path ? `${path}: ${issue.message}` : issue.message;
};

import type { Request, Response } from "express";
import { ContactMessage } from "../models/ContactMessage";
import { contactMessageCreateSchema, contactMessageUpdateSchema } from "../validators/contactMessage";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { firstZodIssueMessage } from "../utils/zodError";

/**
 * Unlike Events/Gallery/Testimonials, contact messages are never public
 * reading material — there's no "published" concept here, and every route
 * except create is behind requireAuth (see routes/contactMessages.routes.ts).
 * A visitor can only ever write one; only an admin can read, mark
 * read/unread, or delete any of them.
 */
export const createMessage = asyncHandler(async (req: Request, res: Response) => {
  const parsed = contactMessageCreateSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new ApiError(400, firstZodIssueMessage(parsed.error));
  }

  await ContactMessage.create(parsed.data);
  res.status(201).json({ message: "Thanks for reaching out — we'll be in touch soon." });
});

export const listMessages = asyncHandler(async (_req: Request, res: Response) => {
  const items = await ContactMessage.find().sort({ createdAt: -1 });
  res.json({ items });
});

export const getMessage = asyncHandler(async (req: Request, res: Response) => {
  const item = await ContactMessage.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, "Message not found.");
  }
  res.json({ item });
});

export const updateMessage = asyncHandler(async (req: Request, res: Response) => {
  const parsed = contactMessageUpdateSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new ApiError(400, firstZodIssueMessage(parsed.error));
  }

  const item = await ContactMessage.findByIdAndUpdate(req.params.id, parsed.data, { new: true });
  if (!item) {
    throw new ApiError(404, "Message not found.");
  }
  res.json({ item });
});

export const deleteMessage = asyncHandler(async (req: Request, res: Response) => {
  const item = await ContactMessage.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, "Message not found.");
  }
  res.json({ message: "Deleted." });
});

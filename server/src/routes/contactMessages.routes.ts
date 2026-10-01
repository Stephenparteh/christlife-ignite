import { Router } from "express";
import {
  createMessage,
  listMessages,
  getMessage,
  updateMessage,
  deleteMessage,
} from "../controllers/contactMessages.controller";
import { requireAuth } from "../middleware/auth";
import { requireValidObjectId } from "../utils/objectId";
import { rateLimit } from "../middleware/rateLimit";

const router = Router();

// Blunts spam/abuse of the public form: 5 submissions / 15 min / IP.
const contactFormRateLimit = rateLimit({ max: 5, windowMs: 15 * 60 * 1000 });

router.post("/", contactFormRateLimit, createMessage);
router.get("/", requireAuth, listMessages);
router.get("/:id", requireValidObjectId(), requireAuth, getMessage);
router.patch("/:id", requireValidObjectId(), requireAuth, updateMessage);
router.delete("/:id", requireValidObjectId(), requireAuth, deleteMessage);

export default router;

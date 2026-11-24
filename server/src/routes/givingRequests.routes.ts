import { Router } from "express";
import {
  createRequest,
  listRequests,
  getRequest,
  updateRequest,
  deleteRequest,
} from "../controllers/givingRequests.controller";
import { requireAuth } from "../middleware/auth";
import { requireValidObjectId } from "../utils/objectId";
import { rateLimit } from "../middleware/rateLimit";

/** Mounted at /api/giving-requests — public submit only. */
export const publicGivingRequestsRouter = Router();
// 5 submissions / 15 min / IP, same budget as the contact form.
publicGivingRequestsRouter.post("/", rateLimit({ max: 5, windowMs: 15 * 60 * 1000 }), createRequest);

/** Mounted at /api/admin/giving-requests — every route requires a session. */
export const adminGivingRequestsRouter = Router();
adminGivingRequestsRouter.use(requireAuth);
adminGivingRequestsRouter.get("/", listRequests);
adminGivingRequestsRouter.get("/:id", requireValidObjectId(), getRequest);
adminGivingRequestsRouter.patch("/:id", requireValidObjectId(), updateRequest);
adminGivingRequestsRouter.delete("/:id", requireValidObjectId(), deleteRequest);

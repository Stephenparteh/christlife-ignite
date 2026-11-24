import { Router } from "express";
import {
  listPublicMethods,
  listMethods,
  getMethod,
  createMethod,
  updateMethod,
  reorderMethods,
  deleteMethod,
} from "../controllers/givingMethods.controller";
import { requireAuth } from "../middleware/auth";
import { requireValidObjectId } from "../utils/objectId";

/** Mounted at /api/giving-methods — public, active methods only. */
export const publicGivingMethodsRouter = Router();
publicGivingMethodsRouter.get("/", listPublicMethods);

/** Mounted at /api/admin/giving-methods — every route requires a session. */
export const adminGivingMethodsRouter = Router();
adminGivingMethodsRouter.use(requireAuth);
adminGivingMethodsRouter.get("/", listMethods);
adminGivingMethodsRouter.post("/", createMethod);
adminGivingMethodsRouter.put("/reorder", reorderMethods);
adminGivingMethodsRouter.get("/:id", requireValidObjectId(), getMethod);
adminGivingMethodsRouter.patch("/:id", requireValidObjectId(), updateMethod);
adminGivingMethodsRouter.delete("/:id", requireValidObjectId(), deleteMethod);

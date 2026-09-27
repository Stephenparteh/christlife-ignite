import { Router } from "express";
import { getSettings, updateSettings } from "../controllers/settings.controller";
import { requireAuth } from "../middleware/auth";

const router = Router();

router.get("/", getSettings);
router.patch("/", requireAuth, updateSettings);

export default router;

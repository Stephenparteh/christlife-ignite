import { Router } from "express";
import { getBibleStudy, updateBibleStudy } from "../controllers/bibleStudy.controller";
import { requireAuth } from "../middleware/auth";

const router = Router();

router.get("/", getBibleStudy);
router.patch("/", requireAuth, updateBibleStudy);

export default router;

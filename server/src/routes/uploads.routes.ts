import { Router } from "express";
import { requireAuth } from "../middleware/auth";
import { uploadMiddleware } from "../middleware/upload";
import { createUpload } from "../controllers/uploads.controller";

const router = Router();

router.post("/", requireAuth, uploadMiddleware, createUpload);

export default router;

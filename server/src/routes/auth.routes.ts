import { Router } from "express";
import { login, logout, me } from "../controllers/auth.controller";
import { requireAuth } from "../middleware/auth";
import { rateLimit } from "../middleware/rateLimit";

const router = Router();

// Blunts naive brute-forcing without punishing normal use: 10 attempts / 15 min / IP.
const loginRateLimit = rateLimit({ max: 10, windowMs: 15 * 60 * 1000 });

router.post("/login", loginRateLimit, login);
router.post("/logout", logout);
router.get("/me", requireAuth, me);

export default router;

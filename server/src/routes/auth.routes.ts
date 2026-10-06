import { Router } from "express";
import { login, logout, me, changePassword } from "../controllers/auth.controller";
import { requireAuth } from "../middleware/auth";
import { rateLimit } from "../middleware/rateLimit";

const router = Router();

// Blunts naive brute-forcing without punishing normal use: 10 attempts / 15 min / IP.
const loginRateLimit = rateLimit({ max: 10, windowMs: 15 * 60 * 1000 });

// The current password is checked on every attempt, so it gets the same brute-force protection as login.
const changePasswordRateLimit = rateLimit({ max: 10, windowMs: 15 * 60 * 1000 });

router.post("/login", loginRateLimit, login);
router.post("/logout", logout);
router.get("/me", requireAuth, me);
router.post("/change-password", requireAuth, changePasswordRateLimit, changePassword);

export default router;

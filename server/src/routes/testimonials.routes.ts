import { Router } from "express";
import { testimonialsController } from "../controllers/testimonials.controller";
import { requireAuth, attachUserIfPresent } from "../middleware/auth";
import { requireValidObjectId } from "../utils/objectId";

const router = Router();

router.get("/", attachUserIfPresent, testimonialsController.list);
router.get("/:id", requireValidObjectId(), attachUserIfPresent, testimonialsController.getOne);
router.post("/", requireAuth, testimonialsController.create);
router.patch("/:id", requireValidObjectId(), requireAuth, testimonialsController.update);
router.delete("/:id", requireValidObjectId(), requireAuth, testimonialsController.remove);

export default router;

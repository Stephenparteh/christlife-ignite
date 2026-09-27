import { Router } from "express";
import { galleryController } from "../controllers/gallery.controller";
import { requireAuth, attachUserIfPresent } from "../middleware/auth";
import { requireValidObjectId } from "../utils/objectId";

const router = Router();

router.get("/", attachUserIfPresent, galleryController.list);
router.get("/:id", requireValidObjectId(), attachUserIfPresent, galleryController.getOne);
router.post("/", requireAuth, galleryController.create);
router.patch("/:id", requireValidObjectId(), requireAuth, galleryController.update);
router.delete("/:id", requireValidObjectId(), requireAuth, galleryController.remove);

export default router;

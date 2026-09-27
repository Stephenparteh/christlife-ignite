import { Router } from "express";
import { eventsController } from "../controllers/events.controller";
import { requireAuth, attachUserIfPresent } from "../middleware/auth";
import { requireValidObjectId } from "../utils/objectId";

const router = Router();

router.get("/", attachUserIfPresent, eventsController.list);
router.get("/:id", requireValidObjectId(), attachUserIfPresent, eventsController.getOne);
router.post("/", requireAuth, eventsController.create);
router.patch("/:id", requireValidObjectId(), requireAuth, eventsController.update);
router.delete("/:id", requireValidObjectId(), requireAuth, eventsController.remove);

export default router;

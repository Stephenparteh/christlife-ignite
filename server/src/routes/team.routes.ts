import { Router } from "express";
import { teamController } from "../controllers/team.controller";
import { requireAuth, attachUserIfPresent } from "../middleware/auth";
import { requireValidObjectId } from "../utils/objectId";

const router = Router();

router.get("/", attachUserIfPresent, teamController.list);
router.get("/:id", requireValidObjectId(), attachUserIfPresent, teamController.getOne);
router.post("/", requireAuth, teamController.create);
router.patch("/:id", requireValidObjectId(), requireAuth, teamController.update);
router.delete("/:id", requireValidObjectId(), requireAuth, teamController.remove);

export default router;

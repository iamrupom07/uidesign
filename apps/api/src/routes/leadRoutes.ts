import { Router } from "express";
import {
  getLeadsHandler,
  getLeadByIdHandler,
  createLeadHandler,
  updateLeadHandler,
  deleteLeadHandler,
} from "../controllers/leadController";
import { authenticate, requireAdmin } from "../middleware/authMiddleware";
import { validate } from "../middleware/validate";
import { createLeadSchema, updateLeadSchema } from "../validators/leadValidator";

const router: Router = Router();

router.get("/", authenticate, getLeadsHandler);
router.get("/:id", authenticate, getLeadByIdHandler);
router.post("/", authenticate, validate(createLeadSchema), createLeadHandler);
router.put("/:id", authenticate, validate(updateLeadSchema), updateLeadHandler);
router.delete("/:id", authenticate, requireAdmin, deleteLeadHandler);

export default router;

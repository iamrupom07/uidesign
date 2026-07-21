import { Router } from "express";
import {
  getCategoriesHandler,
  getCategoryByIdHandler,
  createCategoryHandler,
  updateCategoryHandler,
  deleteCategoryHandler,
} from "../controllers/categoryController";
import { authenticate } from "../middleware/authMiddleware";
import { requireAdmin } from "../middleware/rbacMiddleware";
import { validate } from "../middleware/validate";
import { createCategorySchema, updateCategorySchema } from "../validators/categoryValidator";

const router: Router = Router();

router.get("/", getCategoriesHandler);
router.get("/:id", getCategoryByIdHandler);

// Protected Admin Routes
router.post("/", authenticate, requireAdmin, validate(createCategorySchema), createCategoryHandler);
router.put(
  "/:id",
  authenticate,
  requireAdmin,
  validate(updateCategorySchema),
  updateCategoryHandler
);
router.delete("/:id", authenticate, requireAdmin, deleteCategoryHandler);

export default router;

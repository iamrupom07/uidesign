import { Router } from "express";
import {
  getProductsHandler,
  getProductByIdHandler,
  createProductHandler,
  updateProductHandler,
  deleteProductHandler,
} from "../controllers/productController";
import { authenticate } from "../middleware/authMiddleware";
import { requireAdmin } from "../middleware/rbacMiddleware";
import { validate } from "../middleware/validate";
import { createProductSchema, updateProductSchema } from "../validators/productValidator";

const router: Router = Router();

router.get("/", getProductsHandler);
router.get("/:id", getProductByIdHandler);

// Protected Admin Routes
router.post("/", authenticate, requireAdmin, validate(createProductSchema), createProductHandler);
router.put("/:id", authenticate, requireAdmin, validate(updateProductSchema), updateProductHandler);
router.delete("/:id", authenticate, requireAdmin, deleteProductHandler);

export default router;

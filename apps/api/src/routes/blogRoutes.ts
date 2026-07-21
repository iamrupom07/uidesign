import { Router } from "express";
import {
  getBlogPostsHandler,
  getBlogStatsHandler,
  getBlogPostByIdHandler,
  getBlogPostBySlugHandler,
  createBlogPostHandler,
  updateBlogPostHandler,
  toggleBlogPostStatusHandler,
  deleteBlogPostHandler,
} from "../controllers/blogController";
import { authenticate, requireAdmin } from "../middleware/authMiddleware";
import { validate } from "../middleware/validate";
import {
  createBlogSchema,
  updateBlogSchema,
  toggleBlogPublishSchema,
} from "../validators/blogValidator";

const router: Router = Router();

// Public routes for website visitors
router.get("/", getBlogPostsHandler);
router.get("/stats", getBlogStatsHandler);
router.get("/slug/:slug", getBlogPostBySlugHandler);
router.get("/:id", getBlogPostByIdHandler);

// Protected Admin/Staff routes
router.post("/", authenticate, validate(createBlogSchema), createBlogPostHandler);
router.put("/:id", authenticate, validate(updateBlogSchema), updateBlogPostHandler);
router.patch("/:id/publish", authenticate, validate(toggleBlogPublishSchema), toggleBlogPostStatusHandler);
router.delete("/:id", authenticate, requireAdmin, deleteBlogPostHandler);

export default router;

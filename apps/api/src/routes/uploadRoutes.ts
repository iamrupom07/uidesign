import { Router } from "express";
import { uploadCloudinaryHandler } from "../controllers/uploadController";
import { authenticate } from "../middleware/authMiddleware";

const router: Router = Router();

// Protected upload endpoint for Cloudinary image uploads
router.post("/cloudinary", authenticate, uploadCloudinaryHandler);

export default router;

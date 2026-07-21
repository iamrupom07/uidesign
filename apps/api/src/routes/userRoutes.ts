import { Router } from "express";
import {
  getUsersHandler,
  getUserByIdHandler,
  updateProfileHandler,
  changePasswordHandler,
} from "../controllers/userController";
import { authenticate, requireAdmin } from "../middleware/authMiddleware";

const router: Router = Router();

router.use(authenticate);

router.put("/profile", updateProfileHandler);
router.put("/password", changePasswordHandler);
router.get("/", requireAdmin, getUsersHandler);
router.get("/:id", getUserByIdHandler);

export default router;

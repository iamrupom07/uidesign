import { Router } from "express";
import {
  meHandler,
  loginHandler,
  registerHandler,
  refreshHandler,
  logoutHandler,
} from "../controllers/authController";
import { authenticate } from "../middleware/authMiddleware";
import { validate } from "../middleware/validate";
import { authRateLimiter } from "../middleware/rateLimiter";
import { loginSchema, registerSchema } from "../validators/authValidator";

const router: Router = Router();

router.get("/me", authenticate, meHandler);
router.post("/sign-in", authRateLimiter, validate(loginSchema), loginHandler);
router.post("/sign-up", authRateLimiter, validate(registerSchema), registerHandler);
router.post("/refresh", refreshHandler);
router.post("/sign-out", authenticate, logoutHandler);

export default router;

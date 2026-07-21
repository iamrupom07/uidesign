import { Router } from "express";
import { healthCheckHandler } from "../controllers/healthController";

const router: Router = Router();

router.get("/health", healthCheckHandler);

export default router;

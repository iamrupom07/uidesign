import { Router } from "express";
import {
  getSubmissionsHandler,
  getSubmissionByIdHandler,
  createSubmissionHandler,
  updateSubmissionHandler,
  deleteSubmissionHandler,
  getSubmissionStatsHandler,
} from "../controllers/submissionController";
import { authenticate, requireAdmin } from "../middleware/authMiddleware";
import { validate } from "../middleware/validate";
import { createSubmissionSchema, updateSubmissionSchema } from "../validators/submissionValidator";

const router: Router = Router();

// Public endpoint to receive user contact/RFP/consultation forms
router.post("/", validate(createSubmissionSchema), createSubmissionHandler);

// Authenticated endpoints for Dashboard
router.get("/stats/overview", authenticate, getSubmissionStatsHandler);
router.get("/", authenticate, getSubmissionsHandler);
router.get("/:id", authenticate, getSubmissionByIdHandler);
router.put("/:id", authenticate, validate(updateSubmissionSchema), updateSubmissionHandler);
router.delete("/:id", authenticate, requireAdmin, deleteSubmissionHandler);

export default router;

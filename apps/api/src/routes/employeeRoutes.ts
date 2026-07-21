import { Router } from "express";
import {
  getEmployeesHandler,
  getEmployeeStatsHandler,
  getEmployeeByIdHandler,
  createEmployeeHandler,
  updateEmployeeHandler,
  updateEmployeeStatusHandler,
  sendCredentialEmailHandler,
  deleteEmployeeHandler,
} from "../controllers/employeeController";
import { authenticate, requireAdmin } from "../middleware/authMiddleware";
import { validate } from "../middleware/validate";
import {
  createEmployeeSchema,
  updateEmployeeSchema,
  updateEmployeeStatusSchema,
} from "../validators/employeeValidator";

const router: Router = Router();

router.use(authenticate, requireAdmin);

router.get("/", getEmployeesHandler);
router.get("/stats", getEmployeeStatsHandler);
router.get("/:id", getEmployeeByIdHandler);
router.post("/", validate(createEmployeeSchema), createEmployeeHandler);
router.put("/:id", validate(updateEmployeeSchema), updateEmployeeHandler);
router.patch("/:id/status", validate(updateEmployeeStatusSchema), updateEmployeeStatusHandler);
router.post("/:id/send-credentials", sendCredentialEmailHandler);
router.delete("/:id", deleteEmployeeHandler);

export default router;

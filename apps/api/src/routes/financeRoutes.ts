import { Router } from "express";
import {
  getFinanceRecordsHandler,
  getFinanceRecordByIdHandler,
  createFinanceRecordHandler,
  updateFinanceRecordHandler,
  deleteFinanceRecordHandler,
} from "../controllers/financeController";
import { authenticate, requireAdmin } from "../middleware/authMiddleware";
import { validate } from "../middleware/validate";
import { createFinanceSchema, updateFinanceSchema } from "../validators/financeValidator";

const router: Router = Router();

router.use(authenticate, requireAdmin);

router.get("/", getFinanceRecordsHandler);
router.get("/:id", getFinanceRecordByIdHandler);
router.post("/", validate(createFinanceSchema), createFinanceRecordHandler);
router.put("/:id", validate(updateFinanceSchema), updateFinanceRecordHandler);
router.delete("/:id", deleteFinanceRecordHandler);

export default router;

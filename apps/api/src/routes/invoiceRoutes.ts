import { Router } from "express";
import {
  getInvoicesHandler,
  getInvoiceStatsHandler,
  getInvoiceByIdHandler,
  createInvoiceHandler,
  updateInvoiceHandler,
  updateInvoiceStatusHandler,
  deleteInvoiceHandler,
  sendInvoiceEmailHandler,
} from "../controllers/invoiceController";
import { authenticate, requireAdmin } from "../middleware/authMiddleware";
import { validate } from "../middleware/validate";
import {
  createInvoiceSchema,
  updateInvoiceSchema,
  updateInvoiceStatusSchema,
} from "../validators/invoiceValidator";

const router: Router = Router();

router.get("/", authenticate, getInvoicesHandler);
router.get("/stats", authenticate, getInvoiceStatsHandler);
router.get("/:id", authenticate, getInvoiceByIdHandler);
router.post("/", authenticate, validate(createInvoiceSchema), createInvoiceHandler);
router.put("/:id", authenticate, validate(updateInvoiceSchema), updateInvoiceHandler);
router.patch("/:id/status", authenticate, validate(updateInvoiceStatusSchema), updateInvoiceStatusHandler);
router.post("/:id/send-email", authenticate, sendInvoiceEmailHandler);
router.delete("/:id", authenticate, requireAdmin, deleteInvoiceHandler);

export default router;

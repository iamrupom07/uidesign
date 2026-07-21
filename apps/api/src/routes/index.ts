import { Router } from "express";
import healthRoutes from "./healthRoutes";
import authRoutes from "./authRoutes";
import userRoutes from "./userRoutes";
import productRoutes from "./productRoutes";
import categoryRoutes from "./categoryRoutes";
import leadRoutes from "./leadRoutes";
import financeRoutes from "./financeRoutes";
import invoiceRoutes from "./invoiceRoutes";
import employeeRoutes from "./employeeRoutes";
import blogRoutes from "./blogRoutes";
import uploadRoutes from "./uploadRoutes";

const router: Router = Router();

router.use("/", healthRoutes);
router.use("/api/v1/auth", authRoutes);
router.use("/api/v1/users", userRoutes);
router.use("/api/v1/products", productRoutes);
router.use("/api/v1/categories", categoryRoutes);
router.use("/api/v1/leads", leadRoutes);
router.use("/api/v1/finance", financeRoutes);
router.use("/api/v1/invoices", invoiceRoutes);
router.use("/api/v1/employees", employeeRoutes);
router.use("/api/v1/blogs", blogRoutes);
router.use("/api/v1/upload", uploadRoutes);

export default router;


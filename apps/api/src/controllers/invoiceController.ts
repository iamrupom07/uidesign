import { Request, Response } from "express";
import { invoiceService } from "../services/invoiceService";
import { createSuccessResponse, asyncHandler } from "@repo/utils";
import { HTTP_STATUS } from "@repo/constants";

export const getInvoicesHandler = asyncHandler(async (req: Request, res: Response) => {
  const status = req.query.status as string | undefined;
  const sector = req.query.sector as string | undefined;
  const search = req.query.search as string | undefined;

  const invoices = await invoiceService.getAllInvoices({ status, sector, search });
  res.status(HTTP_STATUS.OK).json(createSuccessResponse(invoices, "Invoices retrieved successfully"));
});

export const getInvoiceStatsHandler = asyncHandler(async (_req: Request, res: Response) => {
  const stats = await invoiceService.getInvoiceStats();
  res.status(HTTP_STATUS.OK).json(createSuccessResponse(stats, "Invoice statistics retrieved successfully"));
});

export const getInvoiceByIdHandler = asyncHandler(async (req: Request, res: Response) => {
  const invoice = await invoiceService.getInvoiceById(req.params.id as string);
  res.status(HTTP_STATUS.OK).json(createSuccessResponse(invoice, "Invoice retrieved successfully"));
});

export const createInvoiceHandler = asyncHandler(async (req: Request, res: Response) => {
  const invoice = await invoiceService.createInvoice(req.body);
  res.status(HTTP_STATUS.CREATED).json(createSuccessResponse(invoice, "Invoice created successfully"));
});

export const updateInvoiceHandler = asyncHandler(async (req: Request, res: Response) => {
  const invoice = await invoiceService.updateInvoice(req.params.id as string, req.body);
  res.status(HTTP_STATUS.OK).json(createSuccessResponse(invoice, "Invoice updated successfully"));
});

export const updateInvoiceStatusHandler = asyncHandler(async (req: Request, res: Response) => {
  const { status } = req.body;
  const invoice = await invoiceService.updateInvoiceStatus(req.params.id as string, status);
  res.status(HTTP_STATUS.OK).json(createSuccessResponse(invoice, "Invoice status updated successfully"));
});

export const deleteInvoiceHandler = asyncHandler(async (req: Request, res: Response) => {
  await invoiceService.deleteInvoice(req.params.id as string);
  res.status(HTTP_STATUS.OK).json(createSuccessResponse({ success: true }, "Invoice deleted successfully"));
});

export const sendInvoiceEmailHandler = asyncHandler(async (req: Request, res: Response) => {
  const result = await invoiceService.sendInvoiceEmail(req.params.id as string);
  res.status(HTTP_STATUS.OK).json(createSuccessResponse(result, "Invoice email sent successfully"));
});

import { Request, Response } from "express";
import { financeService } from "../services/financeService";
import { createSuccessResponse, asyncHandler } from "@repo/utils";
import { HTTP_STATUS } from "@repo/constants";

export const getFinanceRecordsHandler = asyncHandler(async (_req: Request, res: Response) => {
  const records = await financeService.getAllRecords();
  res.status(HTTP_STATUS.OK).json(createSuccessResponse(records, "Finance records retrieved successfully"));
});

export const getFinanceRecordByIdHandler = asyncHandler(async (req: Request, res: Response) => {
  const record = await financeService.getRecordById(req.params.id);
  res.status(HTTP_STATUS.OK).json(createSuccessResponse(record, "Finance record retrieved successfully"));
});

export const createFinanceRecordHandler = asyncHandler(async (req: Request, res: Response) => {
  const record = await financeService.createRecord(req.body);
  res.status(HTTP_STATUS.CREATED).json(createSuccessResponse(record, "Finance record created successfully"));
});

export const updateFinanceRecordHandler = asyncHandler(async (req: Request, res: Response) => {
  const record = await financeService.updateRecord(req.params.id, req.body);
  res.status(HTTP_STATUS.OK).json(createSuccessResponse(record, "Finance record updated successfully"));
});

export const deleteFinanceRecordHandler = asyncHandler(async (req: Request, res: Response) => {
  await financeService.deleteRecord(req.params.id);
  res.status(HTTP_STATUS.OK).json(createSuccessResponse({ success: true }, "Finance record deleted successfully"));
});

import { Request, Response } from "express";
import { leadService } from "../services/leadService";
import { createSuccessResponse, asyncHandler } from "@repo/utils";
import { HTTP_STATUS } from "@repo/constants";

export const getLeadsHandler = asyncHandler(async (_req: Request, res: Response) => {
  const leads = await leadService.getAllLeads();
  res.status(HTTP_STATUS.OK).json(createSuccessResponse(leads, "Leads retrieved successfully"));
});

export const getLeadByIdHandler = asyncHandler(async (req: Request, res: Response) => {
  const lead = await leadService.getLeadById(req.params.id);
  res.status(HTTP_STATUS.OK).json(createSuccessResponse(lead, "Lead retrieved successfully"));
});

export const createLeadHandler = asyncHandler(async (req: Request, res: Response) => {
  const lead = await leadService.createLead(req.body);
  res.status(HTTP_STATUS.CREATED).json(createSuccessResponse(lead, "Lead created successfully"));
});

export const updateLeadHandler = asyncHandler(async (req: Request, res: Response) => {
  const lead = await leadService.updateLead(req.params.id, req.body);
  res.status(HTTP_STATUS.OK).json(createSuccessResponse(lead, "Lead updated successfully"));
});

export const deleteLeadHandler = asyncHandler(async (req: Request, res: Response) => {
  await leadService.deleteLead(req.params.id);
  res.status(HTTP_STATUS.OK).json(createSuccessResponse({ success: true }, "Lead deleted successfully"));
});

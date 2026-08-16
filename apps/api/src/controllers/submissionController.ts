import { Request, Response } from "express";
import { submissionService } from "../services/submissionService";
import { createSuccessResponse, asyncHandler } from "@repo/utils";
import { HTTP_STATUS } from "@repo/constants";

export const getSubmissionsHandler = asyncHandler(async (req: Request, res: Response) => {
  const { type, status, search } = req.query;
  const submissions = await submissionService.getAllSubmissions({
    type: type ? String(type) : undefined,
    status: status ? String(status) : undefined,
    search: search ? String(search) : undefined,
  });
  res.status(HTTP_STATUS.OK).json(createSuccessResponse(submissions, "Submissions retrieved successfully"));
});

export const getSubmissionByIdHandler = asyncHandler(async (req: Request, res: Response) => {
  const submission = await submissionService.getSubmissionById(req.params.id);
  res.status(HTTP_STATUS.OK).json(createSuccessResponse(submission, "Submission retrieved successfully"));
});

export const createSubmissionHandler = asyncHandler(async (req: Request, res: Response) => {
  const submission = await submissionService.createSubmission(req.body);
  res.status(HTTP_STATUS.CREATED).json(createSuccessResponse(submission, "Inquiry submitted successfully"));
});

export const updateSubmissionHandler = asyncHandler(async (req: Request, res: Response) => {
  const submission = await submissionService.updateSubmission(req.params.id, req.body);
  res.status(HTTP_STATUS.OK).json(createSuccessResponse(submission, "Submission updated successfully"));
});

export const deleteSubmissionHandler = asyncHandler(async (req: Request, res: Response) => {
  await submissionService.deleteSubmission(req.params.id);
  res.status(HTTP_STATUS.OK).json(createSuccessResponse({ success: true }, "Submission deleted successfully"));
});

export const getSubmissionStatsHandler = asyncHandler(async (_req: Request, res: Response) => {
  const stats = await submissionService.getStats();
  res.status(HTTP_STATUS.OK).json(createSuccessResponse(stats, "Submission stats retrieved successfully"));
});

import { Request, Response, NextFunction } from "express";
import { createErrorResponse } from "@repo/utils";
import { HTTP_STATUS } from "@repo/constants";

export class ApiError extends Error {
  public statusCode: number;
  public errors?: Array<{ field?: string; message: string }>;

  constructor(
    statusCode: number,
    message: string,
    errors?: Array<{ field?: string; message: string }>
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  const statusCode = err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
  const message = err.message || "An unexpected error occurred";
  const errors = err.errors || [];

  console.error(`[Error] ${statusCode} - ${message}`, err.stack);

  res.status(statusCode).json(createErrorResponse(message, errors));
};

import { Request, Response } from "express";
import { createSuccessResponse } from "@repo/utils";
import { HTTP_STATUS } from "@repo/constants";

export const healthCheckHandler = (_req: Request, res: Response) => {
  const healthInfo = {
    status: "online",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    service: "MACPROTEC API Engine",
    version: "1.0.0",
  };

  res.status(HTTP_STATUS.OK).json(createSuccessResponse(healthInfo, "API service is healthy"));
};

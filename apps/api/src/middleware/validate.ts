import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";
import { ApiError } from "./errorHandler";
import { HTTP_STATUS } from "@repo/constants";

export const validate = (schema: ZodSchema) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors = error.errors.map((e) => ({
          field: e.path.slice(1).join("."),
          message: e.message,
        }));
        const detailedMsg =
          formattedErrors.length > 0
            ? `Validation failed: ${formattedErrors.map((f) => `${f.field ? `${f.field}: ` : ""}${f.message}`).join(", ")}`
            : "Validation failed";
        return next(
          new ApiError(HTTP_STATUS.UNPROCESSABLE_ENTITY, detailedMsg, formattedErrors)
        );
      }
      next(error);
    }
  };
};

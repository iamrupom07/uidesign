import { ApiResponse, ApiErrorResponse } from "@repo/types";

export const createSuccessResponse = <T>(
  data: T,
  message?: string,
  meta?: ApiResponse["meta"]
): ApiResponse<T> => {
  return {
    success: true,
    ...(message && { message }),
    data,
    ...(meta && { meta }),
  };
};

export const createErrorResponse = (
  message: string,
  errors?: ApiErrorResponse["errors"]
): ApiErrorResponse => {
  return {
    success: false,
    message,
    ...(errors && errors.length > 0 && { errors }),
  };
};

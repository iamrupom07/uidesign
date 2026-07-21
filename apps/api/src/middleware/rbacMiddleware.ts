import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "./authMiddleware";
import { ApiError } from "./errorHandler";
import { HTTP_STATUS, ROLES, Role } from "@repo/constants";

export const requireRole = (...allowedRoles: Role[]) => {
  return (req: AuthenticatedRequest, _res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new ApiError(HTTP_STATUS.UNAUTHORIZED, "Authentication required"));
    }

    const hasRole = allowedRoles.includes(req.user.role as Role);

    if (!hasRole) {
      return next(
        new ApiError(
          HTTP_STATUS.FORBIDDEN,
          `Access forbidden. Requires one of roles: [${allowedRoles.join(", ")}]`
        )
      );
    }

    next();
  };
};

export const requireAdmin = requireRole(ROLES.ADMIN);
export const requireUser = requireRole(ROLES.ADMIN, ROLES.USER);

import { Request, Response, NextFunction } from "express";
import { auth } from "../config/auth";
import { ApiError } from "./errorHandler";
import { HTTP_STATUS } from "@repo/constants";
import { fromNodeHeaders } from "better-auth/node";
import { verifyAccessToken } from "../utils/token";

import { prisma } from "@repo/database";

export interface AuthenticatedRequest extends Request {
  user?: any;
  session?: any;
}

export const authenticate = async (
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction
) => {
  try {
    // 1. Check Better Auth Session
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (session && session.user) {
      const dbUser = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          employeeId: true,
          designation: true,
          status: true,
        },
      });
      req.user = dbUser || session.user;
      req.session = session.session;
      return next();
    }

    // 2. Fallback check for JWT Access Token (Cookie or Bearer Header)
    const token =
      req.cookies?.macprotec_access_token ||
      req.headers.authorization?.replace(/^Bearer\s+/i, "");

    if (token) {
      const decoded = verifyAccessToken(token);
      const dbUser = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          employeeId: true,
          designation: true,
          status: true,
        },
      });
      req.user = dbUser || {
        id: decoded.userId,
        email: decoded.email,
        role: decoded.role,
      };
      return next();
    }

    throw new ApiError(
      HTTP_STATUS.UNAUTHORIZED,
      "Authentication required. Invalid or expired session/token."
    );
  } catch (error) {
    next(error);
  }
};

export const requireAdmin = (
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction
) => {
  if (!req.user || req.user.role === "EMPLOYEE") {
    throw new ApiError(
      HTTP_STATUS.FORBIDDEN,
      "Access denied. Administrator privileges required."
    );
  }
  next();
};

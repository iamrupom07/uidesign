import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { UserRole } from "@repo/types";

export interface TokenPayload {
  userId: string;
  email: string;
  role: UserRole;
  [key: string]: any;
}

export const generateAccessToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, env.JWT_ACCESS_SECRET, {
    expiresIn: (env.JWT_ACCESS_EXPIRES_IN || "1d") as any,
  });
};

export const generateRefreshToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, env.JWT_REFRESH_SECRET, {
    expiresIn: (env.JWT_REFRESH_EXPIRES_IN || "30d") as any,
  });
};

export const verifyAccessToken = (token: string): TokenPayload => {
  return jwt.verify(token, env.JWT_ACCESS_SECRET) as TokenPayload;
};

export const verifyRefreshToken = (token: string): TokenPayload => {
  return jwt.verify(token, env.JWT_REFRESH_SECRET) as TokenPayload;
};

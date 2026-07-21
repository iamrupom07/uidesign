import { Request, Response } from "express";
import { auth } from "../config/auth";
import { emailService } from "../emails/emailService";
import { createSuccessResponse, asyncHandler, getSecureCookieOptions } from "@repo/utils";
import { HTTP_STATUS } from "@repo/constants";
import { AuthenticatedRequest } from "../middleware/authMiddleware";
import { ApiError } from "../middleware/errorHandler";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../utils/token";
import { env } from "../config/env";
import { fromNodeHeaders } from "better-auth/node";

const isProduction = env.NODE_ENV === "production";

export const meHandler = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const user = req.user
    ? { ...req.user, role: req.user.role === "EMPLOYEE" ? "EMPLOYEE" : "ADMIN" }
    : null;
  res.status(HTTP_STATUS.OK).json(createSuccessResponse(user, "Current user retrieved"));
});

export const loginHandler = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const authResponse = await auth.api.signInEmail({
    body: { email, password },
    headers: fromNodeHeaders(req.headers),
    asResponse: true,
  });

  // Forward Set-Cookie headers from Better Auth response to Express response
  const setCookie = authResponse.headers.get("set-cookie");
  if (setCookie) {
    res.setHeader("Set-Cookie", setCookie);
  }

  const result = await authResponse.json();

  if (!authResponse.ok || !result?.user) {
    throw new ApiError(
      authResponse.status || HTTP_STATUS.UNAUTHORIZED,
      result?.message || "Invalid credentials"
    );
  }

  // Generate JWT Access & Refresh Tokens
  const tokenPayload = {
    userId: result.user.id,
    email: result.user.email,
    role: result.user.role,
  };

  const accessToken = generateAccessToken(tokenPayload);
  const refreshToken = generateRefreshToken(tokenPayload);

  // Set HTTP-Only Security Cookies for Access & Refresh Tokens
  res.cookie("macprotec_access_token", accessToken, {
    ...getSecureCookieOptions(isProduction),
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });

  res.cookie("macprotec_refresh_token", refreshToken, {
    ...getSecureCookieOptions(isProduction),
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });

  // Trigger non-blocking login notification email
  emailService
    .sendEmail({
      to: email,
      subject: "New Login to Your Account",
      template: "loginNotification",
      data: {
        name: result.user.name || "User",
        ipAddress: req.ip || "Unknown",
        time: new Date().toLocaleString(),
      },
    })
    .catch((err) => console.error("[Auth] Login email trigger failed:", err));

  res.status(HTTP_STATUS.OK).json(
    createSuccessResponse(
      {
        user: result.user,
        accessToken,
        refreshToken,
        session: result.session,
      },
      "Logged in successfully"
    )
  );
});

export const registerHandler = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const authResponse = await auth.api.signUpEmail({
    body: { name, email, password },
    headers: fromNodeHeaders(req.headers),
    asResponse: true,
  });

  const setCookie = authResponse.headers.get("set-cookie");
  if (setCookie) {
    res.setHeader("Set-Cookie", setCookie);
  }

  const result = await authResponse.json();

  if (!authResponse.ok || !result?.user) {
    throw new ApiError(
      authResponse.status || HTTP_STATUS.BAD_REQUEST,
      result?.message || "Registration failed"
    );
  }

  // Generate JWT Access & Refresh Tokens
  const tokenPayload = {
    userId: result.user.id,
    email: result.user.email,
    role: result.user.role || "USER",
  };

  const accessToken = generateAccessToken(tokenPayload);
  const refreshToken = generateRefreshToken(tokenPayload);

  res.cookie("macprotec_access_token", accessToken, {
    ...getSecureCookieOptions(isProduction),
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });

  res.cookie("macprotec_refresh_token", refreshToken, {
    ...getSecureCookieOptions(isProduction),
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });

  // Send Welcome Email
  emailService
    .sendEmail({
      to: email,
      subject: "Welcome to MACPROTEC Engineering!",
      template: "welcome",
      data: {
        name,
        appUrl: process.env.CLIENT_URL || "http://localhost:3000",
      },
    })
    .catch((err) => console.error("[Auth] Welcome email trigger failed:", err));

  res.status(HTTP_STATUS.CREATED).json(
    createSuccessResponse(
      {
        user: result.user,
        accessToken,
        refreshToken,
        session: result.session,
      },
      "Registered successfully"
    )
  );
});

export const refreshHandler = asyncHandler(async (req: Request, res: Response) => {
  const refreshToken =
    req.cookies?.macprotec_refresh_token ||
    req.headers.authorization?.replace(/^Bearer\s+/i, "");

  if (!refreshToken) {
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "Refresh token missing");
  }

  try {
    const decoded = verifyRefreshToken(refreshToken);

    // Issue new Access Token and Refresh Token (Token Rotation)
    const tokenPayload = {
      userId: decoded.userId,
      email: decoded.email,
      role: decoded.role,
    };

    const newAccessToken = generateAccessToken(tokenPayload);
    const newRefreshToken = generateRefreshToken(tokenPayload);

    res.cookie("macprotec_access_token", newAccessToken, {
      ...getSecureCookieOptions(isProduction),
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.cookie("macprotec_refresh_token", newRefreshToken, {
      ...getSecureCookieOptions(isProduction),
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    res.status(HTTP_STATUS.OK).json(
      createSuccessResponse(
        { accessToken: newAccessToken, refreshToken: newRefreshToken },
        "Token refreshed successfully"
      )
    );
  } catch (error) {
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "Invalid or expired refresh token");
  }
});

export const logoutHandler = asyncHandler(async (req: Request, res: Response) => {
  const authResponse = await auth.api.signOut({
    headers: fromNodeHeaders(req.headers),
    asResponse: true,
  });

  const setCookie = authResponse.headers.get("set-cookie");
  if (setCookie) {
    res.setHeader("Set-Cookie", setCookie);
  }

  // Clear HTTP-Only token cookies
  res.clearCookie("macprotec_access_token", { path: "/" });
  res.clearCookie("macprotec_refresh_token", { path: "/" });

  res
    .status(HTTP_STATUS.OK)
    .json(createSuccessResponse({ success: true }, "Logged out successfully"));
});

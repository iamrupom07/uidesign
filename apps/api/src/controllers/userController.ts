import { Request, Response } from "express";
import { userService } from "../services/userService";
import { createSuccessResponse, asyncHandler } from "@repo/utils";
import { HTTP_STATUS } from "@repo/constants";

export const getUsersHandler = asyncHandler(async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string, 10) || 1;
  const limit = parseInt(req.query.limit as string, 10) || 20;

  const result = await userService.getAllUsers(page, limit);
  res
    .status(HTTP_STATUS.OK)
    .json(createSuccessResponse(result.users, "Users retrieved successfully", result.meta));
});

export const getUserByIdHandler = asyncHandler(async (req: Request, res: Response) => {
  const user = await userService.getUserById(req.params.id as string);
  res.status(HTTP_STATUS.OK).json(createSuccessResponse(user, "User profile retrieved"));
});

export const updateProfileHandler = asyncHandler(async (req: any, res: Response) => {
  const userId = req.user.id;
  const updated = await userService.updateProfile(userId, req.body);
  res.status(HTTP_STATUS.OK).json(createSuccessResponse(updated, "Profile updated successfully"));
});

export const changePasswordHandler = asyncHandler(async (req: any, res: Response) => {
  const userId = req.user.id;
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      message: "Both current password and new password are required",
    });
    return;
  }
  await userService.changePassword(userId, currentPassword, newPassword);
  res.status(HTTP_STATUS.OK).json(createSuccessResponse({ success: true }, "Password changed successfully"));
});

import { prisma } from "@repo/database";
import { userRepository, UserRepository } from "../repositories/userRepository";
import { ApiError } from "../middleware/errorHandler";
import { HTTP_STATUS } from "@repo/constants";
import { hashPassword, verifyPassword } from "better-auth/crypto";

export class UserService {
  constructor(private repo: UserRepository = userRepository) {}

  async getUserById(id: string) {
    const user = await this.repo.findById(id);
    if (!user) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, "User not found");
    }
    return user;
  }

  async getAllUsers(page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const { users, total } = await this.repo.findAll(skip, limit);

    return {
      users,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async updateProfile(
    userId: string,
    data: { name?: string; image?: string; designation?: string; phone?: string }
  ) {
    await this.getUserById(userId);
    return this.repo.updateProfile(userId, data);
  }

  async changePassword(userId: string, currentPass: string, newPass: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { accounts: true },
    });

    if (!user) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, "User not found");
    }

    const account = user.accounts.find((a) => a.providerId === "credential");

    if (account && account.password) {
      let isMatch = false;
      // Support Better Auth scrypt hash (salt:hash) or legacy bcrypt hash ($2...)
      if (
        account.password.startsWith("$2a$") ||
        account.password.startsWith("$2b$") ||
        account.password.startsWith("$2y$")
      ) {
        const bcrypt = await import("bcryptjs");
        isMatch = await bcrypt.compare(currentPass, account.password);
      } else {
        isMatch = await verifyPassword({
          hash: account.password,
          password: currentPass,
        });
      }

      if (!isMatch) {
        // Fallback: check if tempPassword matches in case account was created with temp
        if (user.tempPassword && user.tempPassword === currentPass) {
          isMatch = true;
        } else {
          throw new ApiError(HTTP_STATUS.BAD_REQUEST, "Current password is incorrect");
        }
      }
    } else if (user.tempPassword) {
      if (user.tempPassword !== currentPass) {
        throw new ApiError(HTTP_STATUS.BAD_REQUEST, "Current password is incorrect");
      }
    }

    const passwordHash = await hashPassword(newPass);
    return this.repo.updatePassword(userId, passwordHash);
  }
}

export const userService = new UserService();

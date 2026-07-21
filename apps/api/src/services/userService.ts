import { prisma } from "@repo/database";
import { userRepository, UserRepository } from "../repositories/userRepository";
import { ApiError } from "../middleware/errorHandler";
import { HTTP_STATUS, Role } from "@repo/constants";

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
    const bcrypt = await import("bcryptjs");
    const account = await prisma.account.findFirst({
      where: { userId, providerId: "credential" },
    });

    if (account && account.password) {
      const isMatch = await bcrypt.compare(currentPass, account.password);
      if (!isMatch) {
        throw new ApiError(HTTP_STATUS.BAD_REQUEST, "Current password is incorrect");
      }
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(newPass, salt);
    return this.repo.updatePassword(userId, passwordHash);
  }
}

export const userService = new UserService();

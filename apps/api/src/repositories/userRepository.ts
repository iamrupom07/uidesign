import { prisma } from "@repo/database";
import { Role } from "@repo/constants";

export class UserRepository {
  async findById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      include: { accounts: true },
    });
  }

  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  async findAll(skip = 0, take = 20) {
    const [users, total] = await Promise.all([
      prisma.user.findMany({
        skip,
        take,
        orderBy: { createdAt: "desc" },
      }),
      prisma.user.count(),
    ]);

    return { users, total };
  }

  async updateRole(id: string, role: Role) {
    return prisma.user.update({
      where: { id },
      data: { role },
    });
  }

  async updateProfile(
    id: string,
    data: { name?: string; image?: string; designation?: string; phone?: string }
  ) {
    return prisma.user.update({
      where: { id },
      data,
    });
  }

  async updatePassword(id: string, passwordHash: string) {
    // Better Auth account credential update or User password update
    await prisma.user.update({
      where: { id },
      data: { tempPassword: null },
    });

    const account = await prisma.account.findFirst({
      where: { userId: id, providerId: "credential" },
    });

    if (account) {
      return prisma.account.update({
        where: { id: account.id },
        data: { password: passwordHash },
      });
    }

    return prisma.account.create({
      data: {
        userId: id,
        accountId: id,
        providerId: "credential",
        password: passwordHash,
      },
    });
  }
}

export const userRepository = new UserRepository();

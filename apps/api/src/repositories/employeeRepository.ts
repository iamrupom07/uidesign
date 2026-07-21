import { prisma } from "@repo/database";
import { CreateEmployeeInput, UpdateEmployeeInput, EmployeeSummaryStats } from "@repo/types";

export class EmployeeRepository {
  async findAll(options?: { status?: string; search?: string }) {
    const where: any = {
      role: {
        in: ["EMPLOYEE", "ADMIN"],
      },
    };

    if (options?.status && options.status.toUpperCase() !== "ALL") {
      where.status = options.status;
    }

    if (options?.search) {
      const searchStr = options.search.trim();
      where.OR = [
        { name: { contains: searchStr, mode: "insensitive" } },
        { email: { contains: searchStr, mode: "insensitive" } },
        { employeeId: { contains: searchStr, mode: "insensitive" } },
        { designation: { contains: searchStr, mode: "insensitive" } },
      ];
    }

    return prisma.user.findMany({
      where,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        employeeId: true,
        designation: true,
        phone: true,
        status: true,
        tempPassword: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async findById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        employeeId: true,
        designation: true,
        phone: true,
        status: true,
        tempPassword: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  async findLatestEmployeeId(): Promise<string> {
    const year = new Date().getFullYear();
    const latest = await prisma.user.findFirst({
      where: {
        employeeId: {
          startsWith: `EMP-${year}-`,
        },
      },
      orderBy: { createdAt: "desc" },
    });

    if (!latest || !latest.employeeId) {
      return `EMP-${year}-001`;
    }

    const parts = latest.employeeId.split("-");
    const lastSeq = parseInt(parts[parts.length - 1] || "0", 10);
    const nextSeq = (lastSeq + 1).toString().padStart(3, "0");
    return `EMP-${year}-${nextSeq}`;
  }

  async create(data: CreateEmployeeInput, employeeId: string, tempPasswordRaw: string, hashedPassword: string) {
    const roleValue = data.role === "ADMIN" ? "ADMIN" : "EMPLOYEE";

    return prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        role: roleValue,
        employeeId,
        designation: data.designation || "Staff Member",
        phone: data.phone || null,
        status: "ACTIVE",
        tempPassword: tempPasswordRaw,
        accounts: {
          create: {
            accountId: data.email,
            providerId: "credential",
            password: hashedPassword,
          },
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        employeeId: true,
        designation: true,
        phone: true,
        status: true,
        tempPassword: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async update(id: string, data: UpdateEmployeeInput) {
    const updateData: any = {};
    if (data.name !== undefined) updateData.name = data.name;
    if (data.email !== undefined) updateData.email = data.email;
    if (data.designation !== undefined) updateData.designation = data.designation;
    if (data.phone !== undefined) updateData.phone = data.phone;
    if (data.status !== undefined) updateData.status = data.status;
    if (data.role !== undefined) updateData.role = data.role;

    return prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        employeeId: true,
        designation: true,
        phone: true,
        status: true,
        tempPassword: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async delete(id: string) {
    return prisma.user.delete({
      where: { id },
    });
  }

  async getSummaryStats(): Promise<EmployeeSummaryStats> {
    const employees = await prisma.user.findMany({
      where: {
        role: { in: ["EMPLOYEE", "ADMIN"] },
      },
    });

    const totalEmployees = employees.length;
    const activeCount = employees.filter((e) => e.status === "ACTIVE" || !e.status).length;
    const inactiveCount = employees.filter((e) => e.status === "INACTIVE").length;

    const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const newThisMonth = employees.filter((e) => new Date(e.createdAt) >= startOfMonth).length;

    return {
      totalEmployees,
      activeCount,
      inactiveCount,
      newThisMonth,
    };
  }
}

export const employeeRepository = new EmployeeRepository();

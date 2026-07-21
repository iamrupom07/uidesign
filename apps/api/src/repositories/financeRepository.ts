import { prisma } from "@repo/database";
import { CreateFinanceInput, UpdateFinanceInput } from "@repo/types";

export class FinanceRepository {
  async findAll() {
    return prisma.financeRecord.findMany({
      where: { deletedAt: null },
      orderBy: { date: "desc" },
    });
  }

  async findById(id: string) {
    return prisma.financeRecord.findFirst({
      where: { id, deletedAt: null },
    });
  }

  async create(data: CreateFinanceInput) {
    return prisma.financeRecord.create({
      data: {
        type: data.type,
        description: data.description,
        category: data.category,
        sector: data.sector,
        amount: data.amount,
        client: data.client,
        status: data.status ?? "Completed",
        date: data.date ? new Date(data.date) : new Date(),
      },
    });
  }

  async update(id: string, data: UpdateFinanceInput) {
    return prisma.financeRecord.update({
      where: { id },
      data: {
        ...data,
        date: data.date ? new Date(data.date) : undefined,
      },
    });
  }

  async softDelete(id: string) {
    return prisma.financeRecord.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}

export const financeRepository = new FinanceRepository();

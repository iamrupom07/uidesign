import { prisma } from "@repo/database";
import { CreateLeadInput, UpdateLeadInput } from "@repo/types";

export class LeadRepository {
  async findAll() {
    return prisma.lead.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: "desc" },
    });
  }

  async findById(id: string) {
    return prisma.lead.findFirst({
      where: { id, deletedAt: null },
    });
  }

  async create(data: CreateLeadInput) {
    return prisma.lead.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company,
        value: data.value ?? 0,
        status: data.status ?? "New",
        notes: data.notes,
      },
    });
  }

  async update(id: string, data: UpdateLeadInput) {
    return prisma.lead.update({
      where: { id },
      data,
    });
  }

  async softDelete(id: string) {
    return prisma.lead.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}

export const leadRepository = new LeadRepository();

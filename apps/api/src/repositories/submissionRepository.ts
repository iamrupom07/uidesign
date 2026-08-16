import { prisma } from "@repo/database";
import { CreateSubmissionInput, UpdateSubmissionInput } from "@repo/types";

export class SubmissionRepository {
  async findAll(filter?: { type?: string; status?: string; search?: string }) {
    const where: any = { deletedAt: null };

    if (filter?.type && filter.type !== "ALL") {
      where.type = filter.type;
    }

    if (filter?.status && filter.status !== "ALL") {
      where.status = filter.status;
    }

    if (filter?.search) {
      const search = filter.search;
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { company: { contains: search, mode: "insensitive" } },
        { subject: { contains: search, mode: "insensitive" } },
        { message: { contains: search, mode: "insensitive" } },
      ];
    }

    return prisma.submission.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });
  }

  async findById(id: string) {
    return prisma.submission.findFirst({
      where: { id, deletedAt: null },
    });
  }

  async create(data: CreateSubmissionInput) {
    return prisma.submission.create({
      data: {
        type: data.type || "CONTACT",
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company,
        subject: data.subject,
        message: data.message,
        sector: data.sector,
        budget: data.budget,
        startDate: data.startDate,
        scope: data.scope,
        files: data.files,
        status: "NEW",
        notes: data.notes,
      },
    });
  }

  async update(id: string, data: UpdateSubmissionInput) {
    return prisma.submission.update({
      where: { id },
      data,
    });
  }

  async softDelete(id: string) {
    return prisma.submission.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async getStats() {
    const all = await prisma.submission.findMany({
      where: { deletedAt: null },
      select: { type: true, status: true },
    });

    const stats = {
      total: all.length,
      new: all.filter((s) => s.status === "NEW").length,
      underReview: all.filter((s) => s.status === "UNDER_REVIEW").length,
      responded: all.filter((s) => s.status === "RESPONDED").length,
      converted: all.filter((s) => s.status === "CONVERTED").length,
      archived: all.filter((s) => s.status === "ARCHIVED").length,
      rfpCount: all.filter((s) => s.type === "RFP").length,
      contactCount: all.filter((s) => s.type === "CONTACT").length,
      consultationCount: all.filter((s) => s.type === "CONSULTATION" || s.type === "AUDIT").length,
      trainingCount: all.filter((s) => s.type === "TRAINING").length,
    };

    return stats;
  }
}

export const submissionRepository = new SubmissionRepository();

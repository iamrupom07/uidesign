import { prisma } from "@repo/database";
import { CreateInvoiceInput, UpdateInvoiceInput, InvoiceSummaryStats } from "@repo/types";

export class InvoiceRepository {
  async findAll(options?: { status?: string; sector?: string; search?: string }) {
    const where: any = { deletedAt: null };

    if (options?.status && options.status.toUpperCase() !== "ALL") {
      where.status = options.status;
    }

    if (options?.sector && options.sector.toUpperCase() !== "ALL") {
      where.sector = options.sector;
    }

    if (options?.search) {
      const searchStr = options.search.trim();
      where.OR = [
        { invoiceNumber: { contains: searchStr, mode: "insensitive" } },
        { clientName: { contains: searchStr, mode: "insensitive" } },
        { clientEmail: { contains: searchStr, mode: "insensitive" } },
        { clientCompany: { contains: searchStr, mode: "insensitive" } },
      ];
    }

    return prisma.invoice.findMany({
      where,
      include: {
        items: true,
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async findById(id: string) {
    return prisma.invoice.findFirst({
      where: { id, deletedAt: null },
      include: {
        items: true,
      },
    });
  }

  async findLatestInvoiceNumber(): Promise<string> {
    const year = new Date().getFullYear();
    const latest = await prisma.invoice.findFirst({
      where: {
        invoiceNumber: {
          startsWith: `INV-${year}-`,
        },
      },
      orderBy: { createdAt: "desc" },
    });

    if (!latest) {
      return `INV-${year}-001`;
    }

    const parts = latest.invoiceNumber.split("-");
    const lastSeq = parseInt(parts[parts.length - 1] || "0", 10);
    const nextSeq = (lastSeq + 1).toString().padStart(3, "0");
    return `INV-${year}-${nextSeq}`;
  }

  async create(
    data: CreateInvoiceInput,
    invoiceNumber: string,
    subtotal: number,
    taxAmount: number,
    totalAmount: number
  ) {
    return prisma.invoice.create({
      data: {
        invoiceNumber,
        clientName: data.clientName,
        clientEmail: data.clientEmail,
        clientCompany: data.clientCompany || null,
        clientAddress: data.clientAddress || null,
        dueDate: data.dueDate ? new Date(data.dueDate) : null,
        status: data.status || "Draft",
        currency: data.currency || "USD",
        taxRate: data.taxRate ?? 15.0,
        discount: data.discount ?? 0.0,
        subtotal,
        taxAmount,
        totalAmount,
        notes: data.notes || null,
        paymentTerms: data.paymentTerms || "Net 30",
        sector: data.sector || "Industrial & Corporate",
        serviceCategory: data.serviceCategory || "General Engineering",
        items: {
          create: data.items.map((item) => ({
            description: item.description,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            totalPrice: item.quantity * item.unitPrice,
          })),
        },
      },
      include: {
        items: true,
      },
    });
  }

  async update(
    id: string,
    data: UpdateInvoiceInput,
    subtotal?: number,
    taxAmount?: number,
    totalAmount?: number
  ) {
    const updateData: any = {};

    if (data.clientName !== undefined) updateData.clientName = data.clientName;
    if (data.clientEmail !== undefined) updateData.clientEmail = data.clientEmail;
    if (data.clientCompany !== undefined) updateData.clientCompany = data.clientCompany;
    if (data.clientAddress !== undefined) updateData.clientAddress = data.clientAddress;
    if (data.dueDate !== undefined) updateData.dueDate = data.dueDate ? new Date(data.dueDate) : null;
    if (data.status !== undefined) updateData.status = data.status;
    if (data.currency !== undefined) updateData.currency = data.currency;
    if (data.taxRate !== undefined) updateData.taxRate = data.taxRate;
    if (data.discount !== undefined) updateData.discount = data.discount;
    if (data.notes !== undefined) updateData.notes = data.notes;
    if (data.paymentTerms !== undefined) updateData.paymentTerms = data.paymentTerms;
    if (data.sector !== undefined) updateData.sector = data.sector;
    if (data.serviceCategory !== undefined) updateData.serviceCategory = data.serviceCategory;

    if (subtotal !== undefined) updateData.subtotal = subtotal;
    if (taxAmount !== undefined) updateData.taxAmount = taxAmount;
    if (totalAmount !== undefined) updateData.totalAmount = totalAmount;

    // If new items are passed, replace existing items inside transaction
    if (data.items) {
      await prisma.invoiceItem.deleteMany({
        where: { invoiceId: id },
      });
      updateData.items = {
        create: data.items.map((item) => ({
          description: item.description,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          totalPrice: item.quantity * item.unitPrice,
        })),
      };
    }

    return prisma.invoice.update({
      where: { id },
      data: updateData,
      include: {
        items: true,
      },
    });
  }

  async updateStatus(id: string, status: string) {
    return prisma.invoice.update({
      where: { id },
      data: { status },
      include: {
        items: true,
      },
    });
  }

  async softDelete(id: string) {
    return prisma.invoice.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async getSummaryStats(): Promise<InvoiceSummaryStats> {
    const invoices = await prisma.invoice.findMany({
      where: { deletedAt: null },
    });

    let totalInvoiced = 0;
    let paidAmount = 0;
    let outstandingAmount = 0;
    let overdueCount = 0;

    const now = new Date();

    invoices.forEach((inv: any) => {
      totalInvoiced += inv.totalAmount;
      if (inv.status === "Paid") {
        paidAmount += inv.totalAmount;
      } else if (inv.status === "Sent" || inv.status === "Draft") {
        outstandingAmount += inv.totalAmount;
      }

      if (inv.status === "Overdue" || (inv.status !== "Paid" && inv.dueDate && new Date(inv.dueDate) < now)) {
        overdueCount += 1;
      }
    });

    const totalCount = invoices.length;
    const averageValue = totalCount > 0 ? totalInvoiced / totalCount : 0;

    return {
      totalInvoiced,
      paidAmount,
      outstandingAmount,
      overdueCount,
      totalCount,
      averageValue,
    };
  }
}

export const invoiceRepository = new InvoiceRepository();

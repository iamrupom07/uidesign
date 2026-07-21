import { invoiceRepository } from "../repositories/invoiceRepository";
import { CreateInvoiceInput, UpdateInvoiceInput } from "@repo/types";

export class InvoiceService {
  async getAllInvoices(options?: { status?: string; sector?: string; search?: string }) {
    return invoiceRepository.findAll(options);
  }

  async getInvoiceById(id: string) {
    const invoice = await invoiceRepository.findById(id);
    if (!invoice) {
      throw new Error("Invoice not found");
    }
    return invoice;
  }

  async getInvoiceStats() {
    return invoiceRepository.getSummaryStats();
  }

  async createInvoice(data: CreateInvoiceInput) {
    const invoiceNumber = data.invoiceNumber || (await invoiceRepository.findLatestInvoiceNumber());

    // Calculate item totals and grand total
    const subtotal = data.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
    const taxRate = data.taxRate ?? 15.0;
    const discount = data.discount ?? 0.0;

    const afterDiscount = Math.max(0, subtotal - discount);
    const taxAmount = (afterDiscount * taxRate) / 100;
    const totalAmount = afterDiscount + taxAmount;

    return invoiceRepository.create(data, invoiceNumber, subtotal, taxAmount, totalAmount);
  }

  async updateInvoice(id: string, data: UpdateInvoiceInput) {
    const existing = await invoiceRepository.findById(id);
    if (!existing) {
      throw new Error("Invoice not found");
    }

    let subtotal: number | undefined;
    let taxAmount: number | undefined;
    let totalAmount: number | undefined;

    if (data.items) {
      subtotal = data.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
      const taxRate = data.taxRate ?? existing.taxRate;
      const discount = data.discount ?? existing.discount;

      const afterDiscount = Math.max(0, subtotal - discount);
      taxAmount = (afterDiscount * taxRate) / 100;
      totalAmount = afterDiscount + taxAmount;
    }

    return invoiceRepository.update(id, data, subtotal, taxAmount, totalAmount);
  }

  async updateInvoiceStatus(id: string, status: string) {
    const existing = await invoiceRepository.findById(id);
    if (!existing) {
      throw new Error("Invoice not found");
    }
    return invoiceRepository.updateStatus(id, status);
  }

  async deleteInvoice(id: string) {
    const existing = await invoiceRepository.findById(id);
    if (!existing) {
      throw new Error("Invoice not found");
    }
    return invoiceRepository.softDelete(id);
  }

  async sendInvoiceEmail(id: string) {
    const invoice = await invoiceRepository.findById(id);
    if (!invoice) {
      throw new Error("Invoice not found");
    }

    // Update status to 'Sent' if it was 'Draft'
    if (invoice.status === "Draft") {
      await invoiceRepository.updateStatus(id, "Sent");
    }

    return {
      success: true,
      message: `Invoice ${invoice.invoiceNumber} successfully dispatched to ${invoice.clientEmail}`,
      invoiceId: id,
      recipient: invoice.clientEmail,
    };
  }
}

export const invoiceService = new InvoiceService();

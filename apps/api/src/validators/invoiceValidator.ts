import { z } from "zod";

const invoiceItemSchema = z.object({
  description: z.string().min(1, "Description is required"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  unitPrice: z.number().min(0, "Unit price must be non-negative"),
});

export const createInvoiceSchema = z.object({
  body: z.object({
    invoiceNumber: z.string().optional(),
    clientName: z.string().min(2, "Client name is required"),
    clientEmail: z.string().email("Valid client email is required"),
    clientCompany: z.string().optional().nullable(),
    clientAddress: z.string().optional().nullable(),
    dueDate: z.string().optional().nullable(),
    status: z.enum(["Draft", "Sent", "Paid", "Overdue", "Cancelled"]).optional(),
    currency: z.string().optional(),
    taxRate: z.number().min(0).optional(),
    discount: z.number().min(0).optional(),
    notes: z.string().optional().nullable(),
    paymentTerms: z.string().optional().nullable(),
    sector: z.string().optional().nullable(),
    serviceCategory: z.string().optional().nullable(),
    items: z.array(invoiceItemSchema).min(1, "At least one item is required"),
  }),
});

export const updateInvoiceSchema = z.object({
  body: z.object({
    clientName: z.string().min(2).optional(),
    clientEmail: z.string().email().optional(),
    clientCompany: z.string().optional().nullable(),
    clientAddress: z.string().optional().nullable(),
    dueDate: z.string().optional().nullable(),
    status: z.enum(["Draft", "Sent", "Paid", "Overdue", "Cancelled"]).optional(),
    currency: z.string().optional(),
    taxRate: z.number().min(0).optional(),
    discount: z.number().min(0).optional(),
    notes: z.string().optional().nullable(),
    paymentTerms: z.string().optional().nullable(),
    sector: z.string().optional().nullable(),
    serviceCategory: z.string().optional().nullable(),
    items: z.array(invoiceItemSchema).optional(),
  }),
});

export const updateInvoiceStatusSchema = z.object({
  body: z.object({
    status: z.enum(["Draft", "Sent", "Paid", "Overdue", "Cancelled"]),
  }),
});

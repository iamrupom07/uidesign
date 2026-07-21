export type InvoiceStatus = "Draft" | "Sent" | "Paid" | "Overdue" | "Cancelled";

export interface InvoiceItem {
  id?: string;
  invoiceId?: string;
  description: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface CreateInvoiceItemInput {
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  clientName: string;
  clientEmail: string;
  clientCompany?: string | null;
  clientAddress?: string | null;
  issueDate: string | Date;
  dueDate?: string | Date | null;
  status: InvoiceStatus;
  currency: string;
  taxRate: number;
  discount: number;
  subtotal: number;
  taxAmount: number;
  totalAmount: number;
  notes?: string | null;
  paymentTerms?: string | null;
  sector?: string | null;
  serviceCategory?: string | null;
  createdAt: string | Date;
  updatedAt: string | Date;
  deletedAt?: string | Date | null;
  items: InvoiceItem[];
}

export interface CreateInvoiceInput {
  invoiceNumber?: string;
  clientName: string;
  clientEmail: string;
  clientCompany?: string;
  clientAddress?: string;
  dueDate?: string;
  status?: InvoiceStatus;
  currency?: string;
  taxRate?: number;
  discount?: number;
  notes?: string;
  paymentTerms?: string;
  sector?: string;
  serviceCategory?: string;
  items: CreateInvoiceItemInput[];
}

export interface UpdateInvoiceInput {
  clientName?: string;
  clientEmail?: string;
  clientCompany?: string;
  clientAddress?: string;
  dueDate?: string;
  status?: InvoiceStatus;
  currency?: string;
  taxRate?: number;
  discount?: number;
  notes?: string;
  paymentTerms?: string;
  sector?: string;
  serviceCategory?: string;
  items?: CreateInvoiceItemInput[];
}

export interface InvoiceSummaryStats {
  totalInvoiced: number;
  paidAmount: number;
  outstandingAmount: number;
  overdueCount: number;
  totalCount: number;
  averageValue: number;
}

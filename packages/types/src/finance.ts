export type TransactionType = "Income" | "Expense";
export type TransactionStatus = "Completed" | "Pending" | "Invoiced";

export interface FinanceRecord {
  id: string;
  type: TransactionType;
  description: string;
  category: string;
  sector: string;
  amount: number;
  client?: string | null;
  status: TransactionStatus;
  date: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

export interface CreateFinanceInput {
  type: TransactionType;
  description: string;
  category: string;
  sector: string;
  amount: number;
  client?: string;
  status?: TransactionStatus;
  date?: string;
}

export interface UpdateFinanceInput {
  type?: TransactionType;
  description?: string;
  category?: string;
  sector?: string;
  amount?: number;
  client?: string;
  status?: TransactionStatus;
  date?: string;
}

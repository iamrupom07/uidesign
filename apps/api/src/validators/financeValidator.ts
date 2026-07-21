import { z } from "zod";

export const createFinanceSchema = z.object({
  body: z.object({
    type: z.enum(["Income", "Expense"]),
    description: z.string().min(2, "Description must be at least 2 characters"),
    category: z.string().min(2, "Category is required"),
    sector: z.string().min(2, "Sector is required"),
    amount: z.number().positive("Amount must be a positive number"),
    client: z
      .string()
      .optional()
      .nullable()
      .transform((val) => (!val ? undefined : val)),
    status: z.enum(["Completed", "Pending", "Invoiced"]).optional(),
    date: z.string().optional(),
  }),
});

export const updateFinanceSchema = z.object({
  body: z.object({
    type: z.enum(["Income", "Expense"]).optional(),
    description: z.string().min(2).optional(),
    category: z.string().min(2).optional(),
    sector: z.string().min(2).optional(),
    amount: z.number().positive().optional(),
    client: z
      .string()
      .optional()
      .nullable()
      .transform((val) => (!val ? undefined : val)),
    status: z.enum(["Completed", "Pending", "Invoiced"]).optional(),
    date: z.string().optional(),
  }),
});

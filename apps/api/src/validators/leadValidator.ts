import { z } from "zod";

export const createLeadSchema = z.object({
  body: z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z
      .string()
      .optional()
      .nullable()
      .transform((val) => (!val ? undefined : val)),
    company: z.string().min(2, "Company must be at least 2 characters"),
    value: z
      .preprocess(
        (val) => (val === "" || val === null || isNaN(Number(val)) ? 0 : Number(val)),
        z.number().nonnegative()
      )
      .optional(),
    status: z
      .enum(["New", "Contacted", "Proposal Sent", "Closed Won", "Closed Lost"])
      .optional(),
    notes: z
      .string()
      .optional()
      .nullable()
      .transform((val) => (!val ? undefined : val)),
  }),
});

export const updateLeadSchema = z.object({
  body: z.object({
    name: z.string().min(2).optional(),
    email: z.string().email().optional(),
    phone: z
      .string()
      .optional()
      .nullable()
      .transform((val) => (!val ? undefined : val)),
    company: z.string().min(2).optional(),
    value: z
      .preprocess(
        (val) => (val === "" || val === null || isNaN(Number(val)) ? undefined : Number(val)),
        z.number().nonnegative().optional()
      )
      .optional(),
    status: z
      .enum(["New", "Contacted", "Proposal Sent", "Closed Won", "Closed Lost"])
      .optional(),
    notes: z
      .string()
      .optional()
      .nullable()
      .transform((val) => (!val ? undefined : val)),
  }),
});

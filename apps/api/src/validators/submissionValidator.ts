import { z } from "zod";

export const createSubmissionSchema = z.object({
  body: z.object({
    type: z.string().optional().default("CONTACT"),
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().optional().nullable().transform((v) => v || undefined),
    company: z.string().optional().nullable().transform((v) => v || undefined),
    subject: z.string().optional().nullable().transform((v) => v || undefined),
    message: z.string().min(1, "Message is required"),
    sector: z.string().optional().nullable().transform((v) => v || undefined),
    budget: z.string().optional().nullable().transform((v) => v || undefined),
    startDate: z.string().optional().nullable().transform((v) => v || undefined),
    scope: z.string().optional().nullable().transform((v) => v || undefined),
    files: z.string().optional().nullable().transform((v) => v || undefined),
    notes: z.string().optional().nullable().transform((v) => v || undefined),
  }),
});

export const updateSubmissionSchema = z.object({
  body: z.object({
    type: z.string().optional(),
    name: z.string().optional(),
    email: z.string().email().optional(),
    phone: z.string().optional().nullable(),
    company: z.string().optional().nullable(),
    subject: z.string().optional().nullable(),
    message: z.string().optional(),
    sector: z.string().optional().nullable(),
    budget: z.string().optional().nullable(),
    startDate: z.string().optional().nullable(),
    scope: z.string().optional().nullable(),
    files: z.string().optional().nullable(),
    status: z.enum(["NEW", "UNDER_REVIEW", "RESPONDED", "CONVERTED", "ARCHIVED"]).optional(),
    notes: z.string().optional().nullable(),
  }),
});

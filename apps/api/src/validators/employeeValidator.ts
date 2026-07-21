import { z } from "zod";

export const createEmployeeSchema = z.object({
  body: z.object({
    name: z.string().min(2, "Employee name is required"),
    email: z.string().email("Valid email address is required"),
    designation: z.string().optional(),
    phone: z.string().optional().nullable(),
    role: z.enum(["ADMIN", "EMPLOYEE"]).optional(),
  }),
});

export const updateEmployeeSchema = z.object({
  body: z.object({
    name: z.string().min(2).optional(),
    email: z.string().email().optional(),
    designation: z.string().optional(),
    phone: z.string().optional().nullable(),
    status: z.enum(["ACTIVE", "INACTIVE"]).optional(),
    role: z.enum(["ADMIN", "EMPLOYEE"]).optional(),
  }),
});

export const updateEmployeeStatusSchema = z.object({
  body: z.object({
    status: z.enum(["ACTIVE", "INACTIVE"]),
  }),
});

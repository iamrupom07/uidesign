import { z } from "zod";

export const createProductSchema = z.object({
  body: z.object({
    name: z.string().min(2, "Name is required"),
    slug: z.string().min(2, "Slug is required"),
    description: z.string().optional(),
    price: z.number().positive("Price must be greater than 0"),
    stock: z.number().int().nonnegative().optional().default(0),
    isPublished: z.boolean().optional().default(true),
    categoryId: z.string().uuid("Invalid categoryId UUID"),
  }),
});

export const updateProductSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid product ID"),
  }),
  body: z.object({
    name: z.string().min(2).optional(),
    slug: z.string().min(2).optional(),
    description: z.string().optional(),
    price: z.number().positive().optional(),
    stock: z.number().int().nonnegative().optional(),
    isPublished: z.boolean().optional(),
    categoryId: z.string().uuid().optional(),
  }),
});

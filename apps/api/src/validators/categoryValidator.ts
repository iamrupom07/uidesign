import { z } from "zod";

export const createCategorySchema = z.object({
  body: z.object({
    name: z.string().min(2, "Category name is required"),
    slug: z.string().min(2, "Category slug is required"),
    description: z.string().optional(),
  }),
});

export const updateCategorySchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid category ID"),
  }),
  body: z.object({
    name: z.string().min(2).optional(),
    slug: z.string().min(2).optional(),
    description: z.string().optional(),
  }),
});

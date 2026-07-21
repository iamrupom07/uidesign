import { z } from "zod";

const blogImageSchema = z.object({
  url: z.string().url("Valid image URL is required"),
  caption: z.string().optional(),
  altText: z.string().optional(),
  position: z.enum(["INTRO", "BODY_MID", "BODY_END", "GALLERY"]).optional(),
  layout: z.enum(["FULL", "FLOAT_LEFT", "FLOAT_RIGHT", "DUAL_GRID"]).optional(),
});

export const createBlogSchema = z.object({
  body: z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    slug: z.string().optional(),
    excerpt: z.string().min(5, "Excerpt is required"),
    content: z.string().min(10, "Article content is required"),
    category: z.string().optional(),
    sector: z.string().optional(),
    coverImage: z.string().optional().nullable(),
    authorName: z.string().optional(),
    authorTitle: z.string().optional(),
    readTime: z.string().optional(),
    isPublished: z.boolean().optional(),
    images: z.array(blogImageSchema).optional(),
  }),
});

export const updateBlogSchema = z.object({
  body: z.object({
    title: z.string().min(3).optional(),
    slug: z.string().optional(),
    excerpt: z.string().optional(),
    content: z.string().optional(),
    category: z.string().optional(),
    sector: z.string().optional(),
    coverImage: z.string().optional().nullable(),
    authorName: z.string().optional(),
    authorTitle: z.string().optional(),
    readTime: z.string().optional(),
    isPublished: z.boolean().optional(),
    images: z.array(blogImageSchema).optional(),
  }),
});

export const toggleBlogPublishSchema = z.object({
  body: z.object({
    isPublished: z.boolean(),
  }),
});

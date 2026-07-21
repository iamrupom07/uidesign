import { Request, Response } from "express";
import { blogService } from "../services/blogService";
import { createSuccessResponse, asyncHandler } from "@repo/utils";
import { HTTP_STATUS } from "@repo/constants";

export const getBlogPostsHandler = asyncHandler(async (req: Request, res: Response) => {
  const status = req.query.status as string | undefined;
  const category = req.query.category as string | undefined;
  const sector = req.query.sector as string | undefined;
  const search = req.query.search as string | undefined;
  const onlyPublished = req.query.published === "true";

  const posts = await blogService.getAllBlogPosts({
    status,
    category,
    sector,
    search,
    onlyPublished,
  });

  res.status(HTTP_STATUS.OK).json(createSuccessResponse(posts, "Blog posts retrieved successfully"));
});

export const getBlogStatsHandler = asyncHandler(async (_req: Request, res: Response) => {
  const stats = await blogService.getBlogStats();
  res.status(HTTP_STATUS.OK).json(createSuccessResponse(stats, "Blog statistics retrieved successfully"));
});

export const getBlogPostByIdHandler = asyncHandler(async (req: Request, res: Response) => {
  const post = await blogService.getBlogPostById(req.params.id as string);
  res.status(HTTP_STATUS.OK).json(createSuccessResponse(post, "Blog post retrieved successfully"));
});

export const getBlogPostBySlugHandler = asyncHandler(async (req: Request, res: Response) => {
  const post = await blogService.getBlogPostBySlug(req.params.slug as string);
  res.status(HTTP_STATUS.OK).json(createSuccessResponse(post, "Blog post retrieved successfully"));
});

export const createBlogPostHandler = asyncHandler(async (req: Request, res: Response) => {
  const post = await blogService.createBlogPost(req.body);
  res.status(HTTP_STATUS.CREATED).json(createSuccessResponse(post, "Blog post created successfully"));
});

export const updateBlogPostHandler = asyncHandler(async (req: Request, res: Response) => {
  const post = await blogService.updateBlogPost(req.params.id as string, req.body);
  res.status(HTTP_STATUS.OK).json(createSuccessResponse(post, "Blog post updated successfully"));
});

export const toggleBlogPostStatusHandler = asyncHandler(async (req: Request, res: Response) => {
  const { isPublished } = req.body;
  const post = await blogService.togglePublishStatus(req.params.id as string, isPublished);
  res.status(HTTP_STATUS.OK).json(createSuccessResponse(post, "Blog publish status updated successfully"));
});

export const deleteBlogPostHandler = asyncHandler(async (req: Request, res: Response) => {
  await blogService.deleteBlogPost(req.params.id as string);
  res.status(HTTP_STATUS.OK).json(createSuccessResponse({ success: true }, "Blog post deleted successfully"));
});

import { Request, Response } from "express";
import { categoryService } from "../services/categoryService";
import { createSuccessResponse, asyncHandler } from "@repo/utils";
import { HTTP_STATUS } from "@repo/constants";

export const getCategoriesHandler = asyncHandler(async (_req: Request, res: Response) => {
  const categories = await categoryService.getAllCategories();
  res
    .status(HTTP_STATUS.OK)
    .json(createSuccessResponse(categories, "Categories retrieved successfully"));
});

export const getCategoryByIdHandler = asyncHandler(async (req: Request, res: Response) => {
  const category = await categoryService.getCategoryById(req.params.id as string);
  res.status(HTTP_STATUS.OK).json(createSuccessResponse(category, "Category details retrieved"));
});

export const createCategoryHandler = asyncHandler(async (req: Request, res: Response) => {
  const category = await categoryService.createCategory(req.body);
  res
    .status(HTTP_STATUS.CREATED)
    .json(createSuccessResponse(category, "Category created successfully"));
});

export const updateCategoryHandler = asyncHandler(async (req: Request, res: Response) => {
  const category = await categoryService.updateCategory(req.params.id as string, req.body);
  res.status(HTTP_STATUS.OK).json(createSuccessResponse(category, "Category updated successfully"));
});

export const deleteCategoryHandler = asyncHandler(async (req: Request, res: Response) => {
  await categoryService.deleteCategory(req.params.id as string);
  res
    .status(HTTP_STATUS.OK)
    .json(createSuccessResponse({ id: req.params.id }, "Category deleted successfully"));
});

import { Request, Response } from "express";
import { productService } from "../services/productService";
import { createSuccessResponse, asyncHandler } from "@repo/utils";
import { HTTP_STATUS } from "@repo/constants";

export const getProductsHandler = asyncHandler(async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string, 10) || 1;
  const limit = parseInt(req.query.limit as string, 10) || 20;
  const search = req.query.search as string;

  const result = await productService.getAllProducts(page, limit, search);
  res
    .status(HTTP_STATUS.OK)
    .json(createSuccessResponse(result.products, "Products retrieved successfully", result.meta));
});

export const getProductByIdHandler = asyncHandler(async (req: Request, res: Response) => {
  const product = await productService.getProductById(req.params.id as string);
  res.status(HTTP_STATUS.OK).json(createSuccessResponse(product, "Product details retrieved"));
});

export const createProductHandler = asyncHandler(async (req: Request, res: Response) => {
  const product = await productService.createProduct(req.body);
  res
    .status(HTTP_STATUS.CREATED)
    .json(createSuccessResponse(product, "Product created successfully"));
});

export const updateProductHandler = asyncHandler(async (req: Request, res: Response) => {
  const product = await productService.updateProduct(req.params.id as string, req.body);
  res.status(HTTP_STATUS.OK).json(createSuccessResponse(product, "Product updated successfully"));
});

export const deleteProductHandler = asyncHandler(async (req: Request, res: Response) => {
  await productService.deleteProduct(req.params.id as string);
  res
    .status(HTTP_STATUS.OK)
    .json(createSuccessResponse({ id: req.params.id }, "Product soft deleted successfully"));
});

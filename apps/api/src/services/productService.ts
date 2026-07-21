import { productRepository, ProductRepository } from "../repositories/productRepository";
import { categoryRepository, CategoryRepository } from "../repositories/categoryRepository";
import { ApiError } from "../middleware/errorHandler";
import { HTTP_STATUS } from "@repo/constants";
import { CreateProductInput, UpdateProductInput } from "@repo/types";

export class ProductService {
  constructor(
    private repo: ProductRepository = productRepository,
    private categoryRepo: CategoryRepository = categoryRepository
  ) {}

  async getProductById(id: string) {
    const product = await this.repo.findById(id);
    if (!product) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, "Product not found");
    }
    return product;
  }

  async getAllProducts(page = 1, limit = 20, search?: string) {
    const skip = (page - 1) * limit;
    const { products, total } = await this.repo.findAll(skip, limit, search);

    return {
      products,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async createProduct(data: CreateProductInput) {
    const existingSlug = await this.repo.findBySlug(data.slug);
    if (existingSlug) {
      throw new ApiError(HTTP_STATUS.CONFLICT, `Product with slug '${data.slug}' already exists`);
    }

    const category = await this.categoryRepo.findById(data.categoryId);
    if (!category) {
      throw new ApiError(HTTP_STATUS.BAD_REQUEST, "Category specified does not exist");
    }

    return this.repo.create(data);
  }

  async updateProduct(id: string, data: UpdateProductInput) {
    await this.getProductById(id);

    if (data.slug) {
      const existingSlug = await this.repo.findBySlug(data.slug);
      if (existingSlug && existingSlug.id !== id) {
        throw new ApiError(HTTP_STATUS.CONFLICT, `Product with slug '${data.slug}' already exists`);
      }
    }

    if (data.categoryId) {
      const category = await this.categoryRepo.findById(data.categoryId);
      if (!category) {
        throw new ApiError(HTTP_STATUS.BAD_REQUEST, "Category specified does not exist");
      }
    }

    return this.repo.update(id, data);
  }

  async deleteProduct(id: string) {
    await this.getProductById(id);
    return this.repo.softDelete(id);
  }
}

export const productService = new ProductService();

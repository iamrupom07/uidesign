import { categoryRepository, CategoryRepository } from "../repositories/categoryRepository";
import { ApiError } from "../middleware/errorHandler";
import { HTTP_STATUS } from "@repo/constants";
import { CreateCategoryInput, UpdateCategoryInput } from "@repo/types";

export class CategoryService {
  constructor(private repo: CategoryRepository = categoryRepository) {}

  async getCategoryById(id: string) {
    const category = await this.repo.findById(id);
    if (!category) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, "Category not found");
    }
    return category;
  }

  async getAllCategories() {
    return this.repo.findAll();
  }

  async createCategory(data: CreateCategoryInput) {
    const existing = await this.repo.findBySlug(data.slug);
    if (existing) {
      throw new ApiError(HTTP_STATUS.CONFLICT, `Category with slug '${data.slug}' already exists`);
    }
    return this.repo.create(data);
  }

  async updateCategory(id: string, data: UpdateCategoryInput) {
    await this.getCategoryById(id);

    if (data.slug) {
      const existing = await this.repo.findBySlug(data.slug);
      if (existing && existing.id !== id) {
        throw new ApiError(
          HTTP_STATUS.CONFLICT,
          `Category with slug '${data.slug}' already exists`
        );
      }
    }

    return this.repo.update(id, data);
  }

  async deleteCategory(id: string) {
    await this.getCategoryById(id);
    return this.repo.delete(id);
  }
}

export const categoryService = new CategoryService();

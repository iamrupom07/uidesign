import { prisma } from "@repo/database";
import { CreateCategoryInput, UpdateCategoryInput } from "@repo/types";

export class CategoryRepository {
  async findById(id: string) {
    return prisma.category.findUnique({
      where: { id },
    });
  }

  async findBySlug(slug: string) {
    return prisma.category.findUnique({
      where: { slug },
    });
  }

  async findAll() {
    return prisma.category.findMany({
      orderBy: { name: "asc" },
    });
  }

  async create(data: CreateCategoryInput) {
    return prisma.category.create({
      data,
    });
  }

  async update(id: string, data: UpdateCategoryInput) {
    return prisma.category.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return prisma.category.delete({
      where: { id },
    });
  }
}

export const categoryRepository = new CategoryRepository();

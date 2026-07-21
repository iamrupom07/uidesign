import { prisma } from "@repo/database";
import { CreateProductInput, UpdateProductInput } from "@repo/types";

export class ProductRepository {
  async findById(id: string) {
    return prisma.product.findFirst({
      where: { id, deletedAt: null },
      include: { category: true },
    });
  }

  async findBySlug(slug: string) {
    return prisma.product.findFirst({
      where: { slug, deletedAt: null },
      include: { category: true },
    });
  }

  async findAll(skip = 0, take = 20, search?: string) {
    const where = {
      deletedAt: null,
      ...(search && {
        OR: [
          { name: { contains: search, mode: "insensitive" as const } },
          { description: { contains: search, mode: "insensitive" as const } },
        ],
      }),
    };

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take,
        include: { category: true },
        orderBy: { createdAt: "desc" },
      }),
      prisma.product.count({ where }),
    ]);

    return { products, total };
  }

  async create(data: CreateProductInput) {
    return prisma.product.create({
      data,
      include: { category: true },
    });
  }

  async update(id: string, data: UpdateProductInput) {
    return prisma.product.update({
      where: { id },
      data,
      include: { category: true },
    });
  }

  async softDelete(id: string) {
    return prisma.product.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}

export const productRepository = new ProductRepository();

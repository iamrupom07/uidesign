import { prisma } from "@repo/database";
import { CreateBlogPostInput, UpdateBlogPostInput, BlogSummaryStats } from "@repo/types";

export class BlogRepository {
  async findAll(options?: {
    status?: string;
    category?: string;
    sector?: string;
    search?: string;
    onlyPublished?: boolean;
  }) {
    const where: any = { deletedAt: null };

    if (options?.onlyPublished) {
      where.isPublished = true;
    } else if (options?.status && options.status.toUpperCase() !== "ALL") {
      if (options.status.toLowerCase() === "published") where.isPublished = true;
      if (options.status.toLowerCase() === "draft") where.isPublished = false;
    }

    if (options?.category && options.category.toUpperCase() !== "ALL") {
      where.category = options.category;
    }

    if (options?.sector && options.sector.toUpperCase() !== "ALL") {
      where.sector = options.sector;
    }

    if (options?.search) {
      const searchStr = options.search.trim();
      where.OR = [
        { title: { contains: searchStr, mode: "insensitive" } },
        { excerpt: { contains: searchStr, mode: "insensitive" } },
        { authorName: { contains: searchStr, mode: "insensitive" } },
        { category: { contains: searchStr, mode: "insensitive" } },
      ];
    }

    return prisma.blogPost.findMany({
      where,
      include: {
        images: true,
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async findById(id: string) {
    return prisma.blogPost.findUnique({
      where: { id },
      include: {
        images: true,
      },
    });
  }

  async findBySlug(slug: string) {
    return prisma.blogPost.findUnique({
      where: { slug },
      include: {
        images: true,
      },
    });
  }

  async incrementViews(id: string) {
    return prisma.blogPost.update({
      where: { id },
      data: {
        views: { increment: 1 },
      },
    });
  }

  async create(data: CreateBlogPostInput, slug: string, readTime: string) {
    return prisma.blogPost.create({
      data: {
        title: data.title,
        slug,
        excerpt: data.excerpt,
        content: data.content,
        category: data.category || "Engineering Insights",
        sector: data.sector || "Cement",
        coverImage: data.coverImage || null,
        authorName: data.authorName || "MacProtec Technical Desk",
        authorTitle: data.authorTitle || "Chief Process Engineer",
        readTime,
        isPublished: data.isPublished !== undefined ? data.isPublished : true,
        images: data.images && data.images.length > 0
          ? {
              create: data.images.map((img) => ({
                url: img.url,
                caption: img.caption || null,
                altText: img.altText || null,
                position: img.position || "BODY_MID",
                layout: img.layout || "FULL",
              })),
            }
          : undefined,
      },
      include: {
        images: true,
      },
    });
  }

  async update(id: string, data: UpdateBlogPostInput, slug?: string, readTime?: string) {
    const updateData: any = {};
    if (data.title !== undefined) updateData.title = data.title;
    if (slug) updateData.slug = slug;
    if (data.excerpt !== undefined) updateData.excerpt = data.excerpt;
    if (data.content !== undefined) updateData.content = data.content;
    if (data.category !== undefined) updateData.category = data.category;
    if (data.sector !== undefined) updateData.sector = data.sector;
    if (data.coverImage !== undefined) updateData.coverImage = data.coverImage;
    if (data.authorName !== undefined) updateData.authorName = data.authorName;
    if (data.authorTitle !== undefined) updateData.authorTitle = data.authorTitle;
    if (readTime) updateData.readTime = readTime;
    if (data.isPublished !== undefined) updateData.isPublished = data.isPublished;

    if (data.images !== undefined) {
      await prisma.blogImage.deleteMany({ where: { blogPostId: id } });
      if (data.images.length > 0) {
        updateData.images = {
          create: data.images.map((img) => ({
            url: img.url,
            caption: img.caption || null,
            altText: img.altText || null,
            position: img.position || "BODY_MID",
            layout: img.layout || "FULL",
          })),
        };
      }
    }

    return prisma.blogPost.update({
      where: { id },
      data: updateData,
      include: {
        images: true,
      },
    });
  }

  async delete(id: string) {
    return prisma.blogPost.delete({
      where: { id },
    });
  }

  async getSummaryStats(): Promise<BlogSummaryStats> {
    const posts = await prisma.blogPost.findMany({
      where: { deletedAt: null },
    });

    const totalPosts = posts.length;
    const publishedCount = posts.filter((p) => p.isPublished).length;
    const draftCount = posts.filter((p) => !p.isPublished).length;
    const totalViews = posts.reduce((acc, curr) => acc + (curr.views || 0), 0);

    return {
      totalPosts,
      publishedCount,
      draftCount,
      totalViews,
    };
  }
}

export const blogRepository = new BlogRepository();

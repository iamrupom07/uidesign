import { blogRepository } from "../repositories/blogRepository";
import { CreateBlogPostInput, UpdateBlogPostInput } from "@repo/types";

export class BlogService {
  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  private calculateReadTime(content: string): string {
    const wordsPerMinute = 200;
    const wordCount = content.trim().split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min read`;
  }

  async getAllBlogPosts(options?: {
    status?: string;
    category?: string;
    sector?: string;
    search?: string;
    onlyPublished?: boolean;
  }) {
    return blogRepository.findAll(options);
  }

  async getBlogPostById(id: string) {
    const post = await blogRepository.findById(id);
    if (!post) {
      throw new Error("Blog article not found");
    }
    return post;
  }

  async getBlogPostBySlug(slug: string) {
    const post = await blogRepository.findBySlug(slug);
    if (!post) {
      throw new Error("Blog article not found");
    }
    await blogRepository.incrementViews(post.id);
    return post;
  }

  async getBlogStats() {
    return blogRepository.getSummaryStats();
  }

  async createBlogPost(data: CreateBlogPostInput) {
    let slug = data.slug ? this.generateSlug(data.slug) : this.generateSlug(data.title);

    // Check if slug exists
    const existing = await blogRepository.findBySlug(slug);
    if (existing) {
      slug = `${slug}-${Math.floor(1000 + Math.random() * 9000)}`;
    }

    const readTime = data.readTime || this.calculateReadTime(data.content);

    return blogRepository.create(data, slug, readTime);
  }

  async updateBlogPost(id: string, data: UpdateBlogPostInput) {
    const existing = await blogRepository.findById(id);
    if (!existing) {
      throw new Error("Blog article not found");
    }

    let slug: string | undefined = undefined;
    if (data.title && data.title !== existing.title && !data.slug) {
      slug = this.generateSlug(data.title);
    } else if (data.slug && data.slug !== existing.slug) {
      slug = this.generateSlug(data.slug);
    }

    const readTime = data.content ? this.calculateReadTime(data.content) : undefined;

    return blogRepository.update(id, data, slug, readTime);
  }

  async togglePublishStatus(id: string, isPublished: boolean) {
    const existing = await blogRepository.findById(id);
    if (!existing) {
      throw new Error("Blog article not found");
    }

    return blogRepository.update(id, { isPublished });
  }

  async deleteBlogPost(id: string) {
    const existing = await blogRepository.findById(id);
    if (!existing) {
      throw new Error("Blog article not found");
    }

    return blogRepository.delete(id);
  }
}

export const blogService = new BlogService();

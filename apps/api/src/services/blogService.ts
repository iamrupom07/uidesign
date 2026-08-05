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
    let posts = await blogRepository.findAll(options);
    
    // Auto-seed initial real engineering articles if database is empty
    if (posts.length === 0 && (!options?.search && (!options?.category || options.category === "ALL"))) {
      const initialPosts = [
        {
          title: "Pyroprocessing Optimization & Alternative Fuel Combustion in Cement Kilns",
          excerpt: "Discover how CFD flow modeling and thermal heat balances increase alternative fuel substitution rates up to 65% while preserving kiln shell integrity.",
          content: "In the relentless pursuit of thermal efficiency and carbon reduction, cement plant operators are aggressively expanding alternative fuel substitution rates (AFR). However, non-uniform secondary airflow profiles and high chlorine/sulfur volatiles create refractory build-up and burner pipe erosion.\n\n## CFD & Process Modeling Solution\nMacProtec engineers deploy 3-phase Computational Fluid Dynamics (CFD) to optimize burner tip geometry, secondary air mixing, and calciner gas retention times.\n\n## Results & Operational Improvements\n- Achieved 65% AFR substitution without flame destabilization\n- Reduced kiln inlet pressure drop by 14%\n- Extended burner pipe refractory lifespan by 2.5x",
          category: "Engineering Insights",
          sector: "Cement",
          coverImage: "/images/cement_industry.png",
          authorName: "MacProtec Technical Desk",
          authorTitle: "Chief Pyroprocessing Engineer",
          readTime: "6 min read",
          isPublished: true,
        },
        {
          title: "3D Laser Scanning & Reverse Engineering for Brownfield Plant Revamps",
          excerpt: "Capturing high-density point cloud spatial data eliminates clash errors during brownfield equipment replacements and piping retrofits.",
          content: "Brownfield plant retrofits often suffer from outdated as-built drawings, leading to costly site clashes during installation. By deploying sub-millimeter terrestrial 3D laser scanners, MacProtec creates accurate CAD representations of preheater towers, raw mills, and pipe racks prior to procurement.\n\n## Point Cloud to CAD Workflow\n1. High-Density Spatial Scanning: Millions of laser coordinates captured per station.\n2. Noise Extraction & Alignment: Geo-referencing coordinates to plant datum points.\n3. 3D Solid Model Generation: Converting point clouds into native STEP/DWG intelligent piping components.\n\n## Project Outcomes\n- Zero field rework during 2025 plant shutdown\n- Reduced mechanical installation duration by 4 days",
          category: "3D Laser Scanning",
          sector: "Heavy Engineering",
          coverImage: "/images/card_laser_scanning.png",
          authorName: "MacProtec Spatial Desk",
          authorTitle: "Lead Laser Scanning Specialist",
          readTime: "5 min read",
          isPublished: true,
        },
        {
          title: "Predictive Telemetry & AI Digital Twins for Heavy Industrial Equipment",
          excerpt: "Connecting real-time SCADA sensor streams to virtual digital twin replicas enables early detection of bearing defects and thermal anomalies.",
          content: "Predictive maintenance transforms plant reliability from reactive firefighting to planned proactive turnarounds. Integrating IoT edge telemetry with digital twin models forecast equipment fatigue weeks before failure occurs.\n\n## Real-Time Telemetry Metrics\nBy monitoring bearing vibration spectrums, oil temperature gradients, and motor current signatures, MacProtec's digital twin models detect subsurface fatigue micro-fractures in drive assemblies long before catastrophic breakdown.",
          category: "CFD & Thermal Simulation",
          sector: "Mining",
          coverImage: "/images/industry_40.png",
          authorName: "Chief Automation Engineer",
          authorTitle: "Digital Twin Solutions Director",
          readTime: "7 min read",
          isPublished: true,
        },
        {
          title: "High-Density Mine Tailing Dewatering & Paste Backfill Pipeline Hydraulics",
          excerpt: "Optimizing non-Newtonian slurry rheology, underflow density, and pipeline friction losses in high-pressure paste pumping lines.",
          content: "Mine tailings management requires rigorous rheological testing and hydraulic pressure loss calculations. MacProtec models yield stress and slump parameters to design safe paste backfill systems.",
          category: "Case Study",
          sector: "Mining",
          coverImage: "/images/tailings_management.png",
          authorName: "Senior Process Engineer",
          authorTitle: "Mining Operations Specialist",
          readTime: "8 min read",
          isPublished: true,
        },
      ];

      for (const item of initialPosts) {
        await this.createBlogPost(item);
      }

      posts = await blogRepository.findAll(options);
    }

    return posts;
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

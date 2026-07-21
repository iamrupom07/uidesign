export type BlogImagePosition = "INTRO" | "BODY_MID" | "BODY_END" | "GALLERY";
export type BlogImageLayout = "FULL" | "FLOAT_LEFT" | "FLOAT_RIGHT" | "DUAL_GRID";

export interface BlogImage {
  id?: string;
  blogPostId?: string;
  url: string;
  caption?: string | null;
  altText?: string | null;
  position: BlogImagePosition;
  layout: BlogImageLayout;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  sector?: string | null;
  coverImage?: string | null;
  authorName: string;
  authorTitle: string;
  readTime: string;
  isPublished: boolean;
  views: number;
  createdAt: string | Date;
  updatedAt: string | Date;
  images: BlogImage[];
}

export interface CreateBlogPostInput {
  title: string;
  slug?: string;
  excerpt: string;
  content: string;
  category?: string;
  sector?: string;
  coverImage?: string;
  authorName?: string;
  authorTitle?: string;
  readTime?: string;
  isPublished?: boolean;
  images?: {
    url: string;
    caption?: string;
    altText?: string;
    position?: BlogImagePosition;
    layout?: BlogImageLayout;
  }[];
}

export interface UpdateBlogPostInput {
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  category?: string;
  sector?: string;
  coverImage?: string;
  authorName?: string;
  authorTitle?: string;
  readTime?: string;
  isPublished?: boolean;
  images?: {
    url: string;
    caption?: string;
    altText?: string;
    position?: BlogImagePosition;
    layout?: BlogImageLayout;
  }[];
}

export interface BlogSummaryStats {
  totalPosts: number;
  publishedCount: number;
  draftCount: number;
  totalViews: number;
}

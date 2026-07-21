export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface Service {
  slug: string;
  title: string;
  summary: string;
  body: string;
  icon?: string;
  heroImage?: string;
  relatedExpertise?: string[];
  published: boolean;
  order: number;
}

export interface Expertise {
  slug: string;
  title: string;
  industry: string;
  summary: string;
  body: string;
  heroImage?: string;
  relatedServices?: string[];
  published: boolean;
  order: number;
}

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  publishedAt: string;
  category: string;
  heroImage?: string;
  author?: string;
  readingTimeMinutes?: number;
}

import { Category } from "./category";

export interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  price: number;
  stock: number;
  isPublished: boolean;
  categoryId: string;
  category?: Category;
  createdAt: Date | string;
  updatedAt: Date | string;
  deletedAt?: Date | string | null;
}

export interface CreateProductInput {
  name: string;
  slug: string;
  description?: string;
  price: number;
  stock?: number;
  isPublished?: boolean;
  categoryId: string;
}

export interface UpdateProductInput {
  name?: string;
  slug?: string;
  description?: string;
  price?: number;
  stock?: number;
  isPublished?: boolean;
  categoryId?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface CreateCategoryInput {
  name: string;
  slug: string;
  description?: string;
}

export interface UpdateCategoryInput {
  name?: string;
  slug?: string;
  description?: string;
}

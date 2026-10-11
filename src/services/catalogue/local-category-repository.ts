import { categories, categoryBySlug } from '@/data/categories';
import type { Category } from '@/data/types';
import type { CategoryRepository } from './types';

export class LocalCategoryRepository implements CategoryRepository {
  async getAllCategories(): Promise<Category[]> {
    return categories;
  }

  async getCategoryBySlug(slug: string): Promise<Category | null> {
    return categoryBySlug[slug] ?? null;
  }
}

export const categoryRepository: CategoryRepository = new LocalCategoryRepository();
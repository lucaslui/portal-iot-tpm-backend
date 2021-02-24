import { CategoryModel } from '@/domain/entities/category'

export interface DeleteCategory {
  delete: (categoryId: string) => Promise<CategoryModel>
}

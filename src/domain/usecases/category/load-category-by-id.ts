import { CategoryModel } from '@/domain/entities/category'

export interface LoadCategoryById {
  loadById: (categoryId: string) => Promise<CategoryModel>
}

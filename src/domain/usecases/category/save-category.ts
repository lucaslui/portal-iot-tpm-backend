import { CategoryModel } from '@/domain/entities/category'

export interface SaveCategory {
  save: (category: CategoryModel) => Promise<CategoryModel>
}

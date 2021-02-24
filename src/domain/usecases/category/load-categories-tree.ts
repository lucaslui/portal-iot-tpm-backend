import { CategoryModel } from '@/domain/entities/category'

export interface LoadCategoriesTree {
  loadTree: () => Promise<CategoryModel>
}

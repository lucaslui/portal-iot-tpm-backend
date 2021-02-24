import { CategoryModel } from '@/domain/entities/category'

export interface AddCategory {
  add: (category: CategoryModel) => Promise<CategoryModel>
}

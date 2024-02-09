import { CategoryModel } from '@/domain/entities/category'
import { AddCategoryModel } from '@/usecases/boundaries/inputs/category/add-category'

export interface AddCategoryRepository {
  add: (category: AddCategoryModel) => Promise<CategoryModel>
}

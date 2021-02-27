import { CategoryModel } from '@/domain/entities/category'
import { AddCategoryModel } from '@/domain/usecases/category/add-category'

export interface AddCategoryRepository {
  add: (category: AddCategoryModel) => Promise<CategoryModel>
}

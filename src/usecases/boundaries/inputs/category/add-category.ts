import { CategoryModel } from '@/domain/entities/category'

export interface AddCategory {
  add: (category: AddCategoryModel) => Promise<CategoryModel>
}

export interface AddCategoryModel {
  name: string
  description: string
  categoryParentId?: string
}

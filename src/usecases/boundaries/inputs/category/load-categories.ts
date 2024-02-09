import { CategoryModel } from '@/domain/entities/category'

export interface LoadCategories {
  load: (query?: LoadCategoriesQueryModel) => Promise<CategoryModel[]>
}

export type LoadCategoriesQueryModel = {
  page?: number
  categoryId?: string
  categoryParentId?: string
}

import { CategoryModel } from '@/domain/entities/category'

export interface EditCategory {
  edit: (category: CategoryModel) => Promise<CategoryModel>
}

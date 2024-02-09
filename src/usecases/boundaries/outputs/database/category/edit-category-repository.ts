import { EditCategoryModel } from '@/usecases/boundaries/inputs/category/edit-category'

export interface EditCategoryRepository {
  edit: (categoryId: string, category: EditCategoryModel) => Promise<void>
}

import { EditCategoryModel } from '@/domain/usecases/category/edit-category'

export interface EditCategoryRepository {
  edit: (categoryId: string, category: EditCategoryModel) => Promise<void>
}

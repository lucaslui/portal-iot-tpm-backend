import { CategoryModel } from '@/domain/entities/category'

export interface RemoveCategoryById {
  removeById: (categoryId: string) => Promise<CategoryModel>
}

import { CategoryModel } from '@/domain/entities/category'

export interface LoadCategoryByIdRepository {
  loadById: (categoryId: string) => Promise<CategoryModel>
}

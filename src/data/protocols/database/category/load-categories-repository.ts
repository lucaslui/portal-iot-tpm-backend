import { CategoryModel } from '@/domain/entities/category'

export interface LoadCategoriesRepository {
  load: (page?: number) => Promise<CategoryModel[]>
}

import { CategoryModel } from '@/domain/entities/category'
import { LoadCategoriesQueryModel } from '@/domain/usecases/category/load-categories'

export interface LoadCategoriesRepository {
  load: (query?: LoadCategoriesQueryModel) => Promise<CategoryModel[]>
}

import { CategoryModel } from '@/domain/entities/category'
import { LoadCategoriesQueryModel } from '@/usecases/boundaries/inputs/category/load-categories'

export interface LoadCategoriesRepository {
  load: (query?: LoadCategoriesQueryModel) => Promise<CategoryModel[]>
}

import { LoadCategoriesRepository } from '@/usecases/boundaries/outputs/database/category/load-categories-repository'
import { CategoryModel } from '@/domain/entities/category'
import { LoadCategories, LoadCategoriesQueryModel } from '@/usecases/boundaries/inputs/category/load-categories'

export class DbLoadCategories implements LoadCategories {
  constructor(private readonly loadCategoriesRepository: LoadCategoriesRepository) {}

  async load(query?: LoadCategoriesQueryModel): Promise<CategoryModel[]> {
    const categories = await this.loadCategoriesRepository.load(query)
    if (categories) {
      return categories
    }
    return null
  }
}

import { LoadCategoriesRepository } from '@/data/protocols/database/category/load-categories-repository'
import { CategoryModel } from '@/domain/entities/category'
import { LoadCategories, LoadCategoriesQueryModel } from '@/domain/usecases/category/load-categories'

export class DbLoadCategories implements LoadCategories {
  constructor (
    private readonly loadCategoriesRepository: LoadCategoriesRepository
  ) { }

  async load (query?: LoadCategoriesQueryModel): Promise<CategoryModel[]> {
    const categories = await this.loadCategoriesRepository.load(query)
    if (categories) {
      return categories
    }
    return null
  }
}

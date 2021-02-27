import { LoadCategoriesRepository } from '@/data/protocols/database/category/load-categories-repository'
import { CategoryModel } from '@/domain/entities/category'
import { LoadCategories } from '@/domain/usecases/category/load-categories'

export class DbLoadCategories implements LoadCategories {
  constructor (
    private readonly loadCategoriesRepository: LoadCategoriesRepository
  ) { }

  async load (page?: number): Promise<CategoryModel[]> {
    const categories = await this.loadCategoriesRepository.load(page)
    if (categories) {
      return categories
    }
    return null
  }
}

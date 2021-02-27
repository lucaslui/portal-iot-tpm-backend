import { LoadCategoryByIdRepository } from '@/data/protocols/database/category/load-category-by-id-repository'
import { CategoryModel } from '@/domain/entities/category'
import { LoadCategoryById } from '@/domain/usecases/category/load-category-by-id'

export class DbLoadCategoryById implements LoadCategoryById {
  constructor (
    private readonly loadCategoryByIdRepository: LoadCategoryByIdRepository
  ) { }

  async loadById (categoryId: string): Promise<CategoryModel> {
    const category = await this.loadCategoryByIdRepository.loadById(categoryId)
    if (category) {
      return category
    }
    return null
  }
}

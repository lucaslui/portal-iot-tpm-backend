import { LoadCategoriesByParentRepository } from '@/data/protocols/database/category/load-categories-by-parent-repository'
import { CategoryModel } from '@/domain/entities/category'
import { LoadCategoriesByParent } from '@/domain/usecases/category/load-categories-by-parent'

export class DbLoadCategoriesByParent implements LoadCategoriesByParent {
  constructor (
    private readonly loadCategoriesByParentRepository: LoadCategoriesByParentRepository
  ) { }

  async loadByParent (categoryParentId: string, page?: number): Promise<CategoryModel[]> {
    const categories = await this.loadCategoriesByParentRepository.loadByParent(categoryParentId, page)
    if (categories) {
      return categories
    }
    return null
  }
}

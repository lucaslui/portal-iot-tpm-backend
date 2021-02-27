import { DeleteCategoryRepository } from '@/data/protocols/database/category/delete-category-repository'
import { LoadCategoryByIdRepository } from '@/data/protocols/database/category/load-category-by-id-repository'
import { DeleteCategory } from '@/domain/usecases/category/delete-category'

export class DbDeleteCategory implements DeleteCategory {
  constructor (
    private readonly loadCategoryByIdRepository: LoadCategoryByIdRepository,
    private readonly deleteCategoryRepository: DeleteCategoryRepository
  ) { }

  async delete (categoryId: string): Promise<boolean> {
    const category = await this.loadCategoryByIdRepository.loadById(categoryId)
    if (category) {
      await this.deleteCategoryRepository.delete(categoryId)
      return true
    }
    return false
  }
}

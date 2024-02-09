import { DeleteCategoryRepository } from '@/usecases/boundaries/outputs/database/category/delete-category-repository'
import { LoadCategoriesRepository } from '@/usecases/boundaries/outputs/database/category/load-categories-repository'
import { DeleteCategory } from '@/usecases/boundaries/inputs/category/delete-category'

export class DbDeleteCategory implements DeleteCategory {
  constructor (
    private readonly loadCategoriesRepository: LoadCategoriesRepository,
    private readonly deleteCategoryRepository: DeleteCategoryRepository
  ) { }

  async delete (categoryId: string): Promise<boolean> {
    const category = await this.loadCategoriesRepository.load({ categoryId })
    if (category) {
      await this.deleteCategoryRepository.delete(categoryId)
      return true
    }
    return false
  }
}

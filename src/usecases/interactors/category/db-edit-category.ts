import { EditCategoryRepository } from '@/usecases/boundaries/outputs/database/category/edit-category-repository'
import { LoadCategoriesRepository } from '@/usecases/boundaries/outputs/database/category/load-categories-repository'
import { EditCategory, EditCategoryModel } from '@/usecases/boundaries/inputs/category/edit-category'

export class DbEditCategory implements EditCategory {
  constructor (
    private readonly loadCategoriesRepository: LoadCategoriesRepository,
    private readonly editCategoryRepository: EditCategoryRepository
  ) { }

  async edit (categoryId: string, newCategory: EditCategoryModel): Promise<boolean> {
    const category = await this.loadCategoriesRepository.load({ categoryId })
    if (category) {
      await this.editCategoryRepository.edit(categoryId, newCategory)
      return true
    }
    return false
  }
}

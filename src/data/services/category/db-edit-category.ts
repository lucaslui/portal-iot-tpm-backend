import { EditCategoryRepository } from '@/data/protocols/database/category/edit-category-repository'
import { LoadCategoriesRepository } from '@/data/protocols/database/category/load-categories-repository'
import { EditCategory, EditCategoryModel } from '@/domain/usecases/category/edit-category'

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

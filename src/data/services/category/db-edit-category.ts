import { EditCategoryRepository } from '@/data/protocols/database/category/edit-category-repository'
import { LoadCategoryByIdRepository } from '@/data/protocols/database/category/load-category-by-id-repository'
import { EditCategory, EditCategoryModel } from '@/domain/usecases/category/edit-category'

export class DbEditCategory implements EditCategory {
  constructor (
    private readonly loadCategoryByIdRepository: LoadCategoryByIdRepository,
    private readonly editCategoryRepository: EditCategoryRepository
  ) { }

  async edit (categoryId: string, newCategory: EditCategoryModel): Promise<boolean> {
    const category = await this.loadCategoryByIdRepository.loadById(categoryId)
    if (category) {
      await this.editCategoryRepository.edit(categoryId, newCategory)
      return true
    }
    return false
  }
}

import { AddCategoryRepository } from '@/data/protocols/database/category/add-category-repository'
import { CategoryModel } from '@/domain/entities/category'
import { AddCategory, AddCategoryModel } from '@/domain/usecases/category/add-category'

export class DbAddCategory implements AddCategory {
  constructor (
    private readonly addCategoryRepository: AddCategoryRepository
  ) { }

  async add (category: AddCategoryModel): Promise<CategoryModel> {
    const categoryAdded = await this.addCategoryRepository.add(category)
    if (categoryAdded) {
      return categoryAdded
    }
    return null
  }
}

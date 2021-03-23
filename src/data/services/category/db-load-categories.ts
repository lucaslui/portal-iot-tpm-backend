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
      return this.toTree(categories)
    }
    return null
  }

  toTree (categories: CategoryModel[], tree?: any[]): CategoryModel[] {
    if (!tree) {
      const notParentId = (category): Boolean => !category.categoryParentId
      tree = categories.filter(notParentId)
    }
    tree = tree.map(parentNode => {
      const isChild = (node): Boolean => node.categoryParentId?.toString() === parentNode.id.toString()
      parentNode.children = this.toTree(categories, categories.filter(isChild))
      return parentNode
    })
    return tree
  }
}

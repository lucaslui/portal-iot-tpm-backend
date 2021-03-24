import { LoadCategoriesRepository } from '@/data/protocols/database/category/load-categories-repository'
import { CategoryModel } from '@/domain/entities/category'
import { LoadCategoriesQueryModel } from '@/domain/usecases/category/load-categories'
import { CategoriesTreeModel, LoadCategoriesTree } from '@/domain/usecases/category/load-categories-tree'

export class DbLoadCategoriesTree implements LoadCategoriesTree {
  constructor (
    private readonly loadCategoriesRepository: LoadCategoriesRepository
  ) { }

  async load (query?: LoadCategoriesQueryModel): Promise<CategoriesTreeModel[]> {
    const categories = await this.loadCategoriesRepository.load(query)
    if (categories) {
      return this.toTree(categories)
    }
    return null
  }

  toTree (categories: CategoryModel[], tree?: CategoriesTreeModel[]): CategoriesTreeModel[] {
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

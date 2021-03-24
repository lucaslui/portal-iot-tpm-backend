import { LoadCategoriesRepository } from '@/data/protocols/database/category/load-categories-repository'
import { CategoryModel } from '@/domain/entities/category'
import { CategoriesTreeModel, LoadCategoriesTree, LoadCategoriesTreeQueryModel } from '@/domain/usecases/category/load-categories-tree'

export class DbLoadCategoriesTree implements LoadCategoriesTree {
  constructor (
    private readonly loadCategoriesRepository: LoadCategoriesRepository
  ) { }

  async load (query?: LoadCategoriesTreeQueryModel): Promise<CategoriesTreeModel[]> {
    const categories = await this.loadCategoriesRepository.load()
    if (categories) {
      let tree = this.toTree(categories)
      if (query?.categoryId) {
        const category = tree.filter((category): Boolean => category.id?.toString() === query.categoryId.toString())
        tree = category[0].children
      }
      return tree
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

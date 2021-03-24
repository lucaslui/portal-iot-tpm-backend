import { LoadCategoriesTreeController } from '@/presentation/controllers/category/load-categories-tree-controller'
import { Controller } from '@/presentation/protocols/controller'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { makeDbLoadCategories } from '../../services/category/db-load-categories-factory'

export const makeLoadCategoriesTreeController = (): Controller => {
  const loadCategoriesTreeController = new LoadCategoriesTreeController(makeDbLoadCategories())
  return makeLogControllerDecorator(loadCategoriesTreeController)
}

import { LoadCategoriesTreeController } from '@/application/controllers/category/load-categories-tree-controller'
import { Controller } from '@/application/protocols/controller'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { makeDbLoadCategoriesTree } from '../../services/category/db-load-categories-tree-factory'

export const makeLoadCategoriesTreeController = (): Controller => {
  const loadCategoriesTreeController = new LoadCategoriesTreeController(makeDbLoadCategoriesTree())
  return makeLogControllerDecorator(loadCategoriesTreeController)
}

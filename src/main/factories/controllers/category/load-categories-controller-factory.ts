import { Controller } from '@/presentation/protocols/controller'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { LoadCategoriesController } from '@/presentation/controllers/category/load-categories-controller'
import { makeDbLoadCategories } from '../../services/category/db-load-categories-factory'

export const makeLoadCategoriesController = (): Controller => {
  const loadCategoriesController = new LoadCategoriesController(makeDbLoadCategories())
  return makeLogControllerDecorator(loadCategoriesController)
}

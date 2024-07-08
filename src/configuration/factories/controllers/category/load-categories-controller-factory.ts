import { Controller } from '@/application/protocols/controller'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { LoadCategoriesController } from '@/application/controllers/category/load-categories-controller'
import { makeDbLoadCategories } from '../../usecases/category/db-load-categories-factory'

export const makeLoadCategoriesController = (): Controller => {
  const loadCategoriesController = new LoadCategoriesController(makeDbLoadCategories())
  return makeLogControllerDecorator(loadCategoriesController)
}

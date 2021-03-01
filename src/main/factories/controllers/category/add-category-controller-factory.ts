import { Controller } from '@/presentation/protocols/controller'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { AddCategoryController } from '@/presentation/controllers/category/add-category-controller'
import { makeDbAddCategory } from '../../services/category/db-add-category-factory'
import { makeAddCategoryValidation } from '../../validations/category/add-category-validation-factory'

export const makeAddCategoryController = (): Controller => {
  const addCategoryController = new AddCategoryController(makeDbAddCategory(), makeAddCategoryValidation())
  return makeLogControllerDecorator(addCategoryController)
}

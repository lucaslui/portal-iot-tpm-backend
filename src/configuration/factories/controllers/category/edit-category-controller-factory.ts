import { Controller } from '@/application/protocols/controller'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { EditCategoryController } from '@/application/controllers/category/edit-category-controller'
import { makeDbEditCategory } from '../../usecases/category/db-edit-category-factory'
import { makeEditCategoryValidation } from '../../validations/category/edit-category-validation-factory'

export const makeEditCategoryController = (): Controller => {
  const editCategoryController = new EditCategoryController(makeDbEditCategory(), makeEditCategoryValidation())
  return makeLogControllerDecorator(editCategoryController)
}

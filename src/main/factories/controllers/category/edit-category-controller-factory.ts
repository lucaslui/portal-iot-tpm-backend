import { Controller } from '@/presentation/protocols/controller'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { EditCategoryController } from '@/presentation/controllers/category/edit-category-controller'
import { makeDbEditCategory } from '../../services/category/db-edit-category-factory'
import { makeEditCategoryValidation } from '../../validations/category/edit-category-validation-factory'

export const makeEditCategoryController = (): Controller => {
  const editCategoryController = new EditCategoryController(makeDbEditCategory(), makeEditCategoryValidation())
  return makeLogControllerDecorator(editCategoryController)
}

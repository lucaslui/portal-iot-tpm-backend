import { Controller } from '@/presentation/protocols/controller'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { DeleteCategoryController } from '@/presentation/controllers/category/delete-category-controller'
import { makeDbDeleteCategory } from '../../services/category/db-delete-category-factory'

export const makeDeleteCategoryController = (): Controller => {
  const deleteCategoryController = new DeleteCategoryController(makeDbDeleteCategory())
  return makeLogControllerDecorator(deleteCategoryController)
}

import { Controller } from '@/application/protocols/controller'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { EditArticleController } from '@/application/controllers/article/edit-article-controller'
import { makeDbEditArticle } from '../../usecases/article/db-edit-article-factory'
import { makeEditArticleValidation } from '../../validations/article/edit-article-validation-factory'

export const makeEditArticleController = (): Controller => {
  const editArticleController = new EditArticleController(makeDbEditArticle(), makeEditArticleValidation())
  return makeLogControllerDecorator(editArticleController)
}

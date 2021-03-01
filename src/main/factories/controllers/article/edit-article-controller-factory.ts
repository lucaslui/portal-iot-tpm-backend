import { Controller } from '@/presentation/protocols/controller'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { EditArticleController } from '@/presentation/controllers/article/edit-article-controller'
import { makeDbEditArticle } from '../../services/article/db-edit-article-factory'
import { makeEditArticleValidation } from '../../validations/article/edit-article-validation-factory'

export const makeEditArticleController = (): Controller => {
  const editArticleController = new EditArticleController(makeDbEditArticle(), makeEditArticleValidation())
  return makeLogControllerDecorator(editArticleController)
}

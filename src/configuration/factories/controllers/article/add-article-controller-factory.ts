import { Controller } from '@/application/protocols/controller'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { AddArticleController } from '@/application/controllers/article/add-article-controller'
import { makeDbAddArticle } from '../../usecases/article/db-add-article-factory'
import { makeAddArticleValidation } from '../../validations/article/add-article-validation-factory'

export const makeAddArticleController = (): Controller => {
  const addArticleController = new AddArticleController(makeDbAddArticle(), makeAddArticleValidation())
  return makeLogControllerDecorator(addArticleController)
}

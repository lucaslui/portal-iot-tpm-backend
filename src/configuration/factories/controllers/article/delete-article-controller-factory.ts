import { Controller } from '@/application/protocols/controller'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { DeleteArticleController } from '@/application/controllers/article/delete-article-controller'
import { makeDbDeleteArticle } from '../../services/article/db-delete-article-factory'

export const makeDeleteArticleController = (): Controller => {
  const deleteArticleController = new DeleteArticleController(makeDbDeleteArticle())
  return makeLogControllerDecorator(deleteArticleController)
}

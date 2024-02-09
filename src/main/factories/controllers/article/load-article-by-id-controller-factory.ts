import { Controller } from '@/presentation/protocols/controller'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { LoadArticleByIdController } from '@/presentation/controllers/article/load-article-by-id-controller'
import { makeDbLoadArticleById } from '@/main/factories/services/article/db-load-article-by-id-factory'

export const makeLoadArticleByIdController = (): Controller => {
  const loadArticlesController = new LoadArticleByIdController(makeDbLoadArticleById())
  return makeLogControllerDecorator(loadArticlesController)
}

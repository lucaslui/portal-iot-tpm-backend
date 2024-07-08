import { Controller } from '@/application/protocols/controller'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { LoadArticlesController } from '@/application/controllers/article/load-articles-controller'
import { makeDbLoadArticles } from '../../usecases/article/db-load-articles-factory'

export const makeLoadArticlesController = (): Controller => {
  const loadArticlesController = new LoadArticlesController(makeDbLoadArticles())
  return makeLogControllerDecorator(loadArticlesController)
}

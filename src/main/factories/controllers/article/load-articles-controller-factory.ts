import { Controller } from '@/presentation/protocols/controller'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { LoadArticlesController } from '@/presentation/controllers/article/load-articles-controller'
import { makeDbLoadArticles } from '../../services/article/db-load-articles-factory'

export const makeLoadArticlesController = (): Controller => {
  const loadArticlesController = new LoadArticlesController(makeDbLoadArticles())
  return makeLogControllerDecorator(loadArticlesController)
}

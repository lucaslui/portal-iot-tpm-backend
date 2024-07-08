import { Controller } from '@/application/protocols/controller'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { makeDbLoadArticles } from '../../services/article/db-load-articles-factory'
import { LoadPortalArticlesController } from '@/application/controllers/portal/load-portal-articles-controller'

export const makeLoadPortalArticlesController = (): Controller => {
  const loadPortalArticlesController = new LoadPortalArticlesController(makeDbLoadArticles())
  return makeLogControllerDecorator(loadPortalArticlesController)
}

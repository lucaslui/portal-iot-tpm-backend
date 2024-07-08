import { Controller } from '@/application/protocols/controller'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { LoadPortalArticlesController } from '@/application/controllers/portal/load-portal-articles-controller'
import { makeDbLoadPortalArticles } from '@/configuration/factories/usecases/portal/db-load-portal-articles-factory'

export const makeLoadPortalArticlesController = (): Controller => {
  const loadPortalArticlesController = new LoadPortalArticlesController(makeDbLoadPortalArticles())
  return makeLogControllerDecorator(loadPortalArticlesController)
}

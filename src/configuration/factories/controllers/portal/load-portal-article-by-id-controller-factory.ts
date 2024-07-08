import { Controller } from '@/application/protocols/controller'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { LoadPortalArticleByIdController } from '@/application/controllers/portal/load-portal-article-by-id-controller'
import { makeDbLoadPortalArticleById } from '@/configuration/factories/usecases/portal/db-load-portal-article-by-id-factory'

export const makeLoadPortalArticleByIdController = (): Controller => {
  const loadPortalArticlesController = new LoadPortalArticleByIdController(makeDbLoadPortalArticleById())
  return makeLogControllerDecorator(loadPortalArticlesController)
}

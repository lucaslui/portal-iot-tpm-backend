import { PortalMongoRepository } from '@/infrastructure/database/mongodb/portal-mongo-repository'
import { LoadPortalArticles } from '@/usecases/boundaries/inputs/portal/load-portal-articles'
import { DbLoadPortalArticles } from '@/usecases/interactors/portal/db-load-portal-articles'

export const makeDbLoadPortalArticles = (): LoadPortalArticles => {
  const portalMongoRepository = new PortalMongoRepository()
  return new DbLoadPortalArticles(portalMongoRepository)
}

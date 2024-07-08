import { LoadArticles } from '@/usecases/boundaries/inputs/article/load-articles'
import { PortalMongoRepository } from '@/infrastructure/database/mongodb/portal-mongo-repository'
import { DbLoadPortalArticles } from '@/usecases/interactors/portal/db-load-portal-articles'

export const makeDbPortalLoadArticles = (): LoadArticles => {
  const portalMongoRepository = new PortalMongoRepository()
  return new DbLoadPortalArticles(portalMongoRepository)
}

import { PortalMongoRepository } from '@/infrastructure/database/mongodb/portal-mongo-repository'
import { DbLoadPortalArticleById } from '@/usecases/interactors/portal/db-load-portal-article-by-id'
import { LoadPortalArticleById } from '@/usecases/boundaries/inputs/portal/load-portal-article-by-id'

export const makeDbLoadPortalArticleById = (): LoadPortalArticleById => {
  const portalMongoRepository = new PortalMongoRepository()
  return new DbLoadPortalArticleById(portalMongoRepository)
}

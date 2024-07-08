import { PortalMongoRepository } from '@/infrastructure/database/mongodb/portal-mongo-repository'
import { LoadCourses } from '@/usecases/boundaries/inputs/course/load-courses'
import { DbLoadPortalCourses } from '@/usecases/interactors/portal/db-load-portal-courses'

export const makeDbLoadPortalCourses = (): LoadCourses => {
  const portalMongoRepository = new PortalMongoRepository()
  return new DbLoadPortalCourses(portalMongoRepository)
}

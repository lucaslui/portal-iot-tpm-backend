import { Controller } from '@/application/protocols/controller'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { makeDbLoadCourses } from '@/configuration/factories/usecases/course/db-load-courses-factory'
import { LoadPortalCoursesController } from '@/application/controllers/portal/load-portal-courses-controller'

export const makeLoadPortalCoursesController = (): Controller => {
  const loadPortalCoursesController = new LoadPortalCoursesController(makeDbLoadCourses())
  return makeLogControllerDecorator(loadPortalCoursesController)
}

import { Controller } from '@/application/protocols/controller'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { LoadCoursesController } from '@/application/controllers/course/load-courses-controller'
import { makeDbLoadCourses } from '@/configuration/factories/services/course/db-load-courses-factory'

export const makeLoadCoursesController = (): Controller => {
  const loadCoursesController = new LoadCoursesController(makeDbLoadCourses())
  return makeLogControllerDecorator(loadCoursesController)
}

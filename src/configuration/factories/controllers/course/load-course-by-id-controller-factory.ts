import { Controller } from '@/application/protocols/controller'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { LoadCourseByIdController } from '@/application/controllers/course/load-course-by-id-controller'
import { makeDbLoadCourseById } from '@/configuration/factories/services/course/db-load-course-by-id-factory'

export const makeLoadCourseByIdController = (): Controller => {
  const loadCoursesController = new LoadCourseByIdController(makeDbLoadCourseById())
  return makeLogControllerDecorator(loadCoursesController)
}

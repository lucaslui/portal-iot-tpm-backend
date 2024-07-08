import { Controller } from '@/application/protocols/controller'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { makeDbDeleteCourse } from '@/configuration/factories/usecases/course/db-delete-course-factory'
import { DeleteCourseController } from '@/application/controllers/course/delete-course-controller'

export const makeDeleteCourseController = (): Controller => {
  const deleteCourseController = new DeleteCourseController(makeDbDeleteCourse())
  return makeLogControllerDecorator(deleteCourseController)
}

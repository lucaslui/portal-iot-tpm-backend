import { Controller } from '@/application/protocols/controller'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { EditCourseController } from '@/application/controllers/course/edit-course-controller'
import { makeDbEditCourse } from '@/configuration/factories/usecases/course/db-edit-course-factory'
import { makeEditCourseValidation } from '@/configuration/factories/validations/course/edit-course-validation-factory'

export const makeEditCourseController = (): Controller => {
  const editCourseController = new EditCourseController(makeDbEditCourse(), makeEditCourseValidation())
  return makeLogControllerDecorator(editCourseController)
}

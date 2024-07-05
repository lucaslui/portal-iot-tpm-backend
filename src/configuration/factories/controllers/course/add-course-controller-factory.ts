import { Controller } from '@/application/protocols/controller'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { AddCourseController } from '@/application/controllers/course/add-course-controller'
import { makeDbAddCourse } from '@/configuration/factories/services/course/db-add-course-factory'
import { makeAddCourseValidation } from '@/configuration/factories/validations/course/add-course-validation-factory'

export const makeAddCourseController = (): Controller => {
  const addCourseController = new AddCourseController(makeDbAddCourse(), makeAddCourseValidation())
  return makeLogControllerDecorator(addCourseController)
}

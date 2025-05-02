import { noContent, serverError, unauthorized } from '@/application/helpers/http-helper'
import { Controller } from '@/application/protocols/controller'
import { HttpRequest, HttpResponse } from '@/application/protocols/http'
import { DeleteCourse } from '@/usecases/boundaries/inputs/course/delete-course'

export class DeleteCourseController implements Controller {
  constructor(private readonly deleteCourse: DeleteCourse) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { articleId } = httpRequest.params
      const isSuccessful = await this.deleteCourse.delete(httpRequest.userId, articleId)
      if (!isSuccessful) {
        return unauthorized()
      }
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

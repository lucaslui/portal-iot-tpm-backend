import { ok, serverError } from '@/application/helpers/http-helper'
import { Controller } from '@/application/protocols/controller'
import { HttpRequest, HttpResponse } from '@/application/protocols/http'
import { LoadCourseById } from '@/usecases/boundaries/inputs/course/load-course-by-id'

export class LoadCourseByIdController implements Controller {
  constructor(private readonly loadCourseById: LoadCourseById) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { courseId } = httpRequest.params
      const course = await this.loadCourseById.loadById({ courseId })
      return ok(course)
    } catch (error) {
      return serverError(error)
    }
  }
}

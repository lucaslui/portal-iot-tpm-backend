import { ok, serverError } from '@/application/helpers/http-helper'
import { Controller } from '@/application/protocols/controller'
import { HttpRequest, HttpResponse } from '@/application/protocols/http'
import { LoadCourses } from '@/usecases/boundaries/inputs/course/load-courses'

export class LoadCoursesController implements Controller {
  constructor (
    private readonly loadCourses: LoadCourses
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { page, limit, type, search, userId, categoryIds, month, year } = httpRequest.query
      const courses = await this.loadCourses.load({
        page,
        limit,
        search,
        type,
        userId,
        categoryIds,
        month,
        year
      })
      return ok(courses)
    } catch (error) {
      return serverError(error)
    }
  }
}

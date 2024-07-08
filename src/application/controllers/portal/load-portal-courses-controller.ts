import { ok, serverError } from '@/application/helpers/http-helper'
import { Controller } from '@/application/protocols/controller'
import { HttpRequest, HttpResponse } from '@/application/protocols/http'
import { LoadPortalCourses } from '@/usecases/boundaries/inputs/portal/load-portal-courses'

export class LoadPortalCoursesController implements Controller {
  constructor (
    private readonly loadPortalCourses: LoadPortalCourses
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { page, limit, type, search, userId, categoryIds, month, year } = httpRequest.query
      const articles = await this.loadPortalCourses.load({
        page,
        limit,
        search,
        type,
        userId,
        categoryIds,
        month,
        year
      })
      return ok(articles)
    } catch (error) {
      return serverError(error)
    }
  }
}

import { ok, serverError } from '@/application/helpers/http-helper'
import { Controller } from '@/application/protocols/controller'
import { HttpRequest, HttpResponse } from '@/application/protocols/http'
import { LoadPortalArticles } from '@/usecases/boundaries/inputs/portal/load-portal-articles'

export class LoadPortalArticlesController implements Controller {
  constructor (
    private readonly loadPortalArticles: LoadPortalArticles
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { page, limit, type, search, state, userId, categoryIds, month, year } = httpRequest.query
      const articles = await this.loadPortalArticles.load({
        page,
        limit,
        search,
        state,
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

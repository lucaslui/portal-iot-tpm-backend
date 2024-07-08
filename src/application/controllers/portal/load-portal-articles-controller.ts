import { LoadArticles } from '@/usecases/boundaries/inputs/article/load-articles'
import { ok, serverError } from '@/application/helpers/http-helper'
import { Controller } from '@/application/protocols/controller'
import { HttpRequest, HttpResponse } from '@/application/protocols/http'

export class LoadPortalArticlesController implements Controller {
  constructor (
    private readonly loadArticles: LoadArticles
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { page, limit, type, search, state, userId, categoryIds, month, year } = httpRequest.query
      const articles = await this.loadArticles.load({
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

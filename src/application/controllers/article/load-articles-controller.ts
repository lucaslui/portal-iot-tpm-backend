import { LoadArticles } from '@/usecases/boundaries/inputs/article/load-articles'
import { ok, serverError } from '@/application/helpers/http-helper'
import { Controller } from '@/application/protocols/controller'
import { HttpRequest, HttpResponse } from '@/application/protocols/http'

export class LoadArticlesController implements Controller {
  constructor (
    private readonly loadArticles: LoadArticles
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { page, articleId, userId, categoryIds, month, year } = httpRequest.query
      const articles = await this.loadArticles.load({
        page,
        articleId,
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

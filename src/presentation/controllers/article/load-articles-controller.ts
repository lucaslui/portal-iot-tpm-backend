import { LoadArticles } from '@/domain/usecases/article/load-articles'
import { ok, serverError } from '@/presentation/helpers/http-helper'
import { Controller } from '@/presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'

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

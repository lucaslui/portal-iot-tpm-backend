import { LoadArticlesByCategory } from '@/domain/usecases/article/load-articles-by-category'
import { ok, serverError } from '@/presentation/helpers/http-helper'
import { Controller } from '@/presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'

export class LoadArticleByCategoryController implements Controller {
  constructor (
    private readonly loadArticlesByCategory: LoadArticlesByCategory
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { categoryId } = httpRequest.params
      const { page } = httpRequest.query
      const articles = await this.loadArticlesByCategory.loadByCategory(categoryId, page)
      return ok(articles)
    } catch (error) {
      return serverError(error)
    }
  }
}

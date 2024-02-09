import { LoadArticleById } from '@/domain/usecases/article/load-article-by-id'
import { ok, serverError } from '@/presentation/helpers/http-helper'
import { Controller } from '@/presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'

export class LoadArticleByIdController implements Controller {
  constructor (
    private readonly loadArticleById: LoadArticleById
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { articleId } = httpRequest.params
      const article = await this.loadArticleById.loadById({ articleId })
      return ok(article)
    } catch (error) {
      return serverError(error)
    }
  }
}

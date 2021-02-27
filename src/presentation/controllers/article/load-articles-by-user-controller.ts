import { LoadArticlesByUser } from '@/domain/usecases/article/load-articles-by-user'
import { ok, serverError } from '@/presentation/helpers/http-helper'
import { Controller } from '@/presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'

export class LoadArticleByUserController implements Controller {
  constructor (
    private readonly loadArticlesByUser: LoadArticlesByUser
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { userId } = httpRequest.params
      const { page } = httpRequest.query
      const articles = await this.loadArticlesByUser.loadByUser(userId, page)
      return ok(articles)
    } catch (error) {
      return serverError(error)
    }
  }
}

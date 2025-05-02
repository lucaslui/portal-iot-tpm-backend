import { ok, serverError } from '@/application/helpers/http-helper'
import { Controller } from '@/application/protocols/controller'
import { HttpRequest, HttpResponse } from '@/application/protocols/http'
import { LoadPortalArticleById } from '@/usecases/boundaries/inputs/portal/load-portal-article-by-id'

export class LoadPortalArticleByIdController implements Controller {
  constructor(private readonly loadPortalArticleById: LoadPortalArticleById) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { articleId } = httpRequest.params
      const article = await this.loadPortalArticleById.loadArticleById({
        articleId
      })
      return ok(article)
    } catch (error) {
      return serverError(error)
    }
  }
}

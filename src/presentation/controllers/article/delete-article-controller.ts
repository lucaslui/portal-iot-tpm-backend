import { DeleteArticle } from '@/domain/usecases/article/delete-article'
import { noContent, serverError, unauthorized } from '@/presentation/helpers/http-helper'
import { Controller } from '@/presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'

export class DeleteArticleController implements Controller {
  constructor (
    private readonly deleteArticle: DeleteArticle
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { articleId } = httpRequest.params
      const article = await this.deleteArticle.delete(httpRequest.userId, articleId)
      if (!article) {
        return unauthorized()
      }
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

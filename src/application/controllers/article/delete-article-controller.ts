import { DeleteArticle } from '@/usecases/boundaries/inputs/article/delete-article'
import { noContent, serverError, unauthorized } from '@/application/helpers/http-helper'
import { Controller } from '@/application/protocols/controller'
import { HttpRequest, HttpResponse } from '@/application/protocols/http'

export class DeleteArticleController implements Controller {
  constructor(private readonly deleteArticle: DeleteArticle) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { articleId } = httpRequest.params
      const isSuccessful = await this.deleteArticle.delete(httpRequest.userId, articleId)
      if (!isSuccessful) {
        return unauthorized()
      }
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

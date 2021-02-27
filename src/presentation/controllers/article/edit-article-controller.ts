import { EditArticle } from '@/domain/usecases/article/edit-article'
import { badRequest, noContent, serverError, unauthorized } from '@/presentation/helpers/http-helper'
import { Controller } from '@/presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'
import { Validation } from '@/presentation/protocols/validation'

export class EditArticleController implements Controller {
  constructor (
    private readonly editArticle: EditArticle,
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { articleId } = httpRequest.params
      const { title, description, content, imageUrl, categoryId } = httpRequest.body
      const isSuccessful = await this.editArticle.edit(httpRequest.userId, articleId, {
        title,
        description,
        content,
        imageUrl,
        categoryId
      })
      if (!isSuccessful) {
        return unauthorized()
      }
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

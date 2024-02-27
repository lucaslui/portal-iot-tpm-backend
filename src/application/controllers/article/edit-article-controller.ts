import { EditArticle } from '@/usecases/boundaries/inputs/article/edit-article'
import { badRequest, noContent, serverError, unauthorized } from '@/application/helpers/http-helper'
import { Controller } from '@/application/protocols/controller'
import { HttpRequest, HttpResponse } from '@/application/protocols/http'
import { Validation } from '@/application/protocols/validation'

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
      const imageBinary = httpRequest.file
      const categoryIds = JSON.parse(httpRequest.body.categoryIds)
      const { title, description, type, state, readTime, content } = httpRequest.body
      const isSuccessful = await this.editArticle.edit(articleId, {
        title,
        description,
        type,
        state,
        readTime,
        content,
        categoryIds,
        imageBinary
      }, httpRequest.userId)
      if (!isSuccessful) {
        return unauthorized()
      }
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

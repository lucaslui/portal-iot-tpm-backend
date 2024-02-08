import { AddArticle } from '@/domain/usecases/article/add-article'
import { badRequest, ok, serverError } from '@/presentation/helpers/http-helper'
import { Controller } from '@/presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'
import { Validation } from '@/presentation/protocols/validation'

export class AddArticleController implements Controller {
  constructor (
    private readonly addArticle: AddArticle,
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const imageBinary = httpRequest.file
      const userId = httpRequest.userId
      const categoryIds = JSON.parse(httpRequest.body.categoryIds)
      const { title, description, content } = httpRequest.body
      const article = await this.addArticle.add({
        title,
        description,
        content,
        imageBinary,
        userId,
        categoryIds
      })
      return ok(article)
    } catch (error) {
      return serverError(error)
    }
  }
}

import { AddArticle } from '@/usecases/boundaries/inputs/article/add-article'
import { badRequest, ok, serverError } from '@/application/helpers/http-helper'
import { Controller } from '@/application/protocols/controller'
import { HttpRequest, HttpResponse } from '@/application/protocols/http'
import { Validation } from '@/application/protocols/validation'

export class AddArticleController implements Controller {
  constructor(
    private readonly addArticle: AddArticle,
    private readonly validation: Validation
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const imageBinary = httpRequest.file
      const userId = httpRequest.userId
      const categoryIds = JSON.parse(httpRequest.body.categoryIds)
      const { title, description, type, state, readTime, content } = httpRequest.body
      const article = await this.addArticle.add({
        title,
        description,
        type,
        state,
        readTime,
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

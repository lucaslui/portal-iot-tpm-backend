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
      const userId = httpRequest.userId
      const { title, description, content, imageUrl, categoryId } = httpRequest.body
      const article = await this.addArticle.add({
        title,
        description,
        content,
        imageUrl,
        userId,
        categoryId,
        createdAt: new Date()
      })
      return ok(article)
    } catch (error) {
      return serverError(error)
    }
  }
}

import { LoadCategories } from '@/usecases/boundaries/inputs/category/load-categories'
import { ok, serverError } from '@/application/helpers/http-helper'
import { Controller } from '@/application/protocols/controller'
import { HttpRequest, HttpResponse } from '@/application/protocols/http'

export class LoadCategoriesController implements Controller {
  constructor(private readonly loadCategories: LoadCategories) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { page, categoryId, categoryParentId } = httpRequest.query
      const articles = await this.loadCategories.load({
        page,
        categoryId,
        categoryParentId
      })
      return ok(articles)
    } catch (error) {
      return serverError(error)
    }
  }
}

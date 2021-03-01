import { LoadCategories } from '@/domain/usecases/category/load-categories'
import { ok, serverError } from '@/presentation/helpers/http-helper'
import { Controller } from '@/presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'

export class LoadCategoriesController implements Controller {
  constructor (
    private readonly loadCategories: LoadCategories
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
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

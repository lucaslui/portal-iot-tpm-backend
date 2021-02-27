import { LoadCategoriesByParent } from '@/domain/usecases/category/load-categories-by-parent'
import { ok, serverError } from '@/presentation/helpers/http-helper'
import { Controller } from '@/presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'

export class LoadCategoriesByParentController implements Controller {
  constructor (
    private readonly loadCategoriesByParent: LoadCategoriesByParent
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { categoryId: categoryParentId } = httpRequest.params
      const { page } = httpRequest.query
      const categories = await this.loadCategoriesByParent.loadByParent(categoryParentId, page)
      return ok(categories)
    } catch (error) {
      return serverError(error)
    }
  }
}

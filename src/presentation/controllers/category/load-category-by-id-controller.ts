import { LoadCategoryById } from '@/domain/usecases/category/load-category-by-id'
import { ok, serverError } from '@/presentation/helpers/http-helper'
import { Controller } from '@/presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'

export class LoadCategoryByIdController implements Controller {
  constructor (
    private readonly loadCategoryById: LoadCategoryById
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { categoryId } = httpRequest.params
      const category = await this.loadCategoryById.loadById(categoryId)
      return ok(category)
    } catch (error) {
      return serverError(error)
    }
  }
}

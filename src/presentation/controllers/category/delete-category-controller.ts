import { DeleteCategory } from '@/domain/usecases/category/delete-category'
import { noContent, notFound, serverError } from '@/presentation/helpers/http-helper'
import { Controller } from '@/presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'

export class DeleteCategoryController implements Controller {
  constructor (
    private readonly deleteCategory: DeleteCategory
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { categoryId } = httpRequest.params
      const isSuccessful = await this.deleteCategory.delete(categoryId)
      if (!isSuccessful) {
        return notFound()
      }
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

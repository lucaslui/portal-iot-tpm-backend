import { EditCategory } from '@/domain/usecases/category/edit-category'
import { badRequest, noContent, notFound, serverError } from '@/presentation/helpers/http-helper'
import { Controller } from '@/presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'
import { Validation } from '@/presentation/protocols/validation'

export class EditCategoryController implements Controller {
  constructor (
    private readonly editCategory: EditCategory,
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { categoryId } = httpRequest.params
      const { name, description, categoryParentId } = httpRequest.body
      const isSuccessful = await this.editCategory.edit(categoryId, {
        name,
        description,
        categoryParentId
      })
      if (!isSuccessful) {
        return notFound()
      }
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

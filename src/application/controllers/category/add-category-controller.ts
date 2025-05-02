import { AddCategory } from '@/usecases/boundaries/inputs/category/add-category'
import { badRequest, ok, serverError } from '@/application/helpers/http-helper'
import { Controller } from '@/application/protocols/controller'
import { HttpRequest, HttpResponse } from '@/application/protocols/http'
import { Validation } from '@/application/protocols/validation'

export class AddCategoryController implements Controller {
  constructor(
    private readonly addCategory: AddCategory,
    private readonly validation: Validation
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { name, description, categoryParentId } = httpRequest.body
      const category = await this.addCategory.add({
        name,
        description,
        categoryParentId
      })
      return ok(category)
    } catch (error) {
      return serverError(error)
    }
  }
}

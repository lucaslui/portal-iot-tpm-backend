import { LoadCategoriesTree } from '@/usecases/boundaries/inputs/category/load-categories-tree'
import { ok, serverError } from '@/application/helpers/http-helper'
import { Controller } from '@/application/protocols/controller'
import { HttpRequest, HttpResponse } from '@/application/protocols/http'

export class LoadCategoriesTreeController implements Controller {
  constructor (
    private readonly loadCategoriesTree: LoadCategoriesTree
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { categoryId } = httpRequest.query
      const categoriesTree = await this.loadCategoriesTree.load({
        categoryId
      })
      return ok(categoriesTree)
    } catch (error) {
      return serverError(error)
    }
  }
}

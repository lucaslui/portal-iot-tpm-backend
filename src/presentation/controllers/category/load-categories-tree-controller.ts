import { LoadCategoriesTree } from '@/domain/usecases/category/load-categories-tree'
import { ok, serverError } from '@/presentation/helpers/http-helper'
import { Controller } from '@/presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'

export class LoadCategoriesTreeController implements Controller {
  constructor (
    private readonly loadCategoriesTree: LoadCategoriesTree
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const categoriesTree = await this.loadCategoriesTree.load()
      return ok(categoriesTree)
    } catch (error) {
      return serverError(error)
    }
  }
}

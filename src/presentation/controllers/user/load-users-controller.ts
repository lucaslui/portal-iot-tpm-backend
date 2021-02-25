import { LoadUsers } from '@/domain/usecases/user/load-users'
import { badRequest, ok, serverError } from '@/presentation/helpers/http-helper'
import { Controller } from '@/presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'
import { Validation } from '@/presentation/protocols/validation'

export class LoadUsersController implements Controller {
  constructor (
    private readonly loadUsers: LoadUsers,
    private readonly validation: Validation
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.query)
      if (error) {
        return badRequest(error)
      }
      const { page } = httpRequest.query
      const users = await this.loadUsers.load(page)
      return ok({ users })
    } catch (error) {
      return serverError(error)
    }
  }
}

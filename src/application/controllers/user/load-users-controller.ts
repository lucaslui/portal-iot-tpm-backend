import { LoadUsers } from '@/usecases/boundaries/inputs/user/load-users'
import { ok, serverError } from '@/application/helpers/http-helper'
import { Controller } from '@/application/protocols/controller'
import { HttpRequest, HttpResponse } from '@/application/protocols/http'

export class LoadUsersController implements Controller {
  constructor (
    private readonly loadUsers: LoadUsers
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { page } = httpRequest.query
      const users = await this.loadUsers.loadUsers(page)
      return ok(users)
    } catch (error) {
      return serverError(error)
    }
  }
}

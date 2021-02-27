import { LoadUsers } from '@/domain/usecases/user/load-users'
import { ok, serverError } from '@/presentation/helpers/http-helper'
import { Controller } from '@/presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'

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

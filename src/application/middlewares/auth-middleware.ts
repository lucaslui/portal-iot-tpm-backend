import { LoadUserByToken } from '@/usecases/boundaries/inputs/auth/load-user-by-token'
import { AccessDeniedError } from '../errors/access-denied-error'
import { forbidden, ok, serverError } from '../helpers/http-helper'
import { HttpRequest, HttpResponse } from '../protocols/http'
import { Middleware } from '../protocols/middleware'

export class AuthMiddleware implements Middleware {
  constructor(
    private readonly loadUserByToken: LoadUserByToken,
    private readonly role?: string
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const accessToken = httpRequest.headers?.['x-access-token']
      if (accessToken) {
        const user = await this.loadUserByToken.load(accessToken, this.role)
        if (user) {
          return ok({ userId: user.id })
        }
      }
      return forbidden(new AccessDeniedError())
    } catch (error) {
      return serverError(error)
    }
  }
}

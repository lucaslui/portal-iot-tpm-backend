import { Authentication } from '@/usecases/boundaries/inputs/auth/authentication'
import { badRequest, ok, serverError, unauthorized } from '@/application/helpers/http-helper'
import { Controller } from '@/application/protocols/controller'
import { HttpRequest, HttpResponse } from '@/application/protocols/http'
import { Validation } from '@/application/protocols/validation'

export class LoginController implements Controller {
  constructor (
    private readonly authentication: Authentication,
    private readonly validation: Validation
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { email, password } = httpRequest.body
      const session = await this.authentication.auth({
        email,
        password
      })
      if (!session) {
        return unauthorized()
      }
      return ok(session)
    } catch (error) {
      return serverError(error)
    }
  }
}

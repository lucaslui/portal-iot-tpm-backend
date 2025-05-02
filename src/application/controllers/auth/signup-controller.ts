import { Authentication } from '@/usecases/boundaries/inputs/auth/authentication'
import { AddUser } from '@/usecases/boundaries/inputs/auth/add-user'
import { EmailInUseError } from '@/application/errors/email-in-use-error'
import { badRequest, forbidden, ok, serverError } from '@/application/helpers/http-helper'
import { Controller } from '@/application/protocols/controller'
import { HttpRequest, HttpResponse } from '@/application/protocols/http'
import { Validation } from '@/application/protocols/validation'

export class SignUpController implements Controller {
  constructor(
    private readonly createUser: AddUser,
    private readonly validation: Validation,
    private readonly authentication: Authentication
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { name, email, password } = httpRequest.body
      const account = await this.createUser.add({
        name,
        email,
        password
      })
      if (!account) {
        return forbidden(new EmailInUseError())
      }
      const session = await this.authentication.auth({
        email,
        password
      })
      return ok(session)
    } catch (error) {
      return serverError(error)
    }
  }
}

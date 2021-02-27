import { Authentication } from '@/domain/usecases/auth/authentication'
import { CreateUser } from '@/domain/usecases/auth/create-user'
import { EmailInUseError } from '@/presentation/errors/email-in-use-error'
import { badRequest, forbidden, ok, serverError } from '@/presentation/helpers/http-helper'
import { Controller } from '@/presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'
import { Validation } from '@/presentation/protocols/validation'

export class SignUpController implements Controller {
  constructor (
    private readonly createUser: CreateUser,
    private readonly validation: Validation,
    private readonly authentication: Authentication
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { name, email, password } = httpRequest.body
      const account = await this.createUser.create({
        name,
        email,
        password,
        profile: {},
        createdAt: new Date()
      })
      if (!account) {
        return forbidden(new EmailInUseError())
      }
      const accessToken = await this.authentication.auth({
        email,
        password
      })
      return ok({ accessToken })
    } catch (error) {
      return serverError(error)
    }
  }
}

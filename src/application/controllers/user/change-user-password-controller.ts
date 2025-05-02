import { ChangeUserPassword } from '@/usecases/boundaries/inputs/user/change-user-password'
import { badRequest, noContent, serverError, unauthorized } from '@/application/helpers/http-helper'
import { Controller } from '@/application/protocols/controller'
import { HttpRequest, HttpResponse } from '@/application/protocols/http'
import { Validation } from '@/application/protocols/validation'

export class ChangeUserPasswordController implements Controller {
  constructor(
    private readonly changeUserPassword: ChangeUserPassword,
    private readonly validation: Validation
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const userId = httpRequest.userId
      const { oldPassword, newPassword } = httpRequest.body
      const isSuccessful = await this.changeUserPassword.changePassword(userId, oldPassword, newPassword)
      if (!isSuccessful) {
        return unauthorized()
      }
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

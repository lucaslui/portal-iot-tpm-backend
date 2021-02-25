import { ChangeUserPassword } from '@/domain/usecases/user/change-user-password'
import { badRequest, noContent, serverError, unauthorized } from '@/presentation/helpers/http-helper'
import { Controller } from '@/presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'
import { Validation } from '@/presentation/protocols/validation'

export class ChangeUserPasswordController implements Controller {
  constructor (
    private readonly changeUserPassword: ChangeUserPassword,
    private readonly validation: Validation
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
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

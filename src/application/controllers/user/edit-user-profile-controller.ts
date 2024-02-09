import { EditUserProfile } from '@/usecases/boundaries/inputs/user/edit-user-profile'
import { badRequest, noContent, serverError } from '@/application/helpers/http-helper'
import { Controller } from '@/application/protocols/controller'
import { HttpRequest, HttpResponse } from '@/application/protocols/http'
import { Validation } from '@/application/protocols/validation'

export class EditUserProfileController implements Controller {
  constructor (
    private readonly editUserProfile: EditUserProfile,
    private readonly validation: Validation
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const userId = httpRequest.userId
      const userProfile = httpRequest.body
      await this.editUserProfile.editProfile(userId, userProfile)
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

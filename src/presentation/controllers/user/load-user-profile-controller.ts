import { LoadUserProfile } from '@/domain/usecases/user/load-user-profile'
import { badRequest, ok, serverError } from '@/presentation/helpers/http-helper'
import { Controller } from '@/presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'
import { Validation } from '@/presentation/protocols/validation'

export class LoadUserProfileController implements Controller {
  constructor (
    private readonly loadUserProfile: LoadUserProfile,
    private readonly validation: Validation
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.params)
      if (error) {
        return badRequest(error)
      }
      const { userId } = httpRequest.params
      const userProfile = await this.loadUserProfile.loadProfile(userId)
      return ok({ userProfile })
    } catch (error) {
      return serverError(error)
    }
  }
}

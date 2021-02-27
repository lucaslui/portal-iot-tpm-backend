import { LoadUserProfile } from '@/domain/usecases/user/load-user-profile'
import { notFound, ok, serverError } from '@/presentation/helpers/http-helper'
import { Controller } from '@/presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'

export class LoadUserProfileController implements Controller {
  constructor (
    private readonly loadUserProfile: LoadUserProfile
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { userId } = httpRequest.params
      const userProfile = await this.loadUserProfile.loadProfile(userId)
      if (!userProfile) {
        return notFound()
      }
      return ok(userProfile)
    } catch (error) {
      return serverError(error)
    }
  }
}

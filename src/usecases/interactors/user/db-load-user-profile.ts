import { LoadUserProfileRepository } from '@/usecases/boundaries/outputs/database/user/load-user-profile-repository'
import { ProfileModel } from '@/domain/entities/user'
import { LoadUserProfile } from '@/usecases/boundaries/inputs/user/load-user-profile'

export class DbLoadUserProfile implements LoadUserProfile {
  constructor (
    private readonly loadUserProfileRepository: LoadUserProfileRepository
  ) {}

  async loadProfile (userId: string): Promise<ProfileModel> {
    const userProfile = await this.loadUserProfileRepository.loadProfile(userId)
    if (userProfile) {
      return userProfile
    }
    return null
  }
}

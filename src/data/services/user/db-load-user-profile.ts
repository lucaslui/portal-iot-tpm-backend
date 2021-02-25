import { LoadUserProfileRepository } from '@/data/protocols/database/user/load-users-repository copy'
import { ProfileModel } from '@/domain/entities/user'
import { LoadUserProfile } from '@/domain/usecases/user/load-user-profile'

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

import { EditUserProfileRepository } from '@/data/protocols/database/user/edit-user-profile-respository'
import { ProfileModel } from '@/domain/entities/user'
import { EditUserProfile } from '@/domain/usecases/user/edit-user-profile'

export class DbEditUserProfile implements EditUserProfile {
  constructor (
    private readonly editUserProfileRepository: EditUserProfileRepository
  ) {}

  async editProfile (userId: string, userProfile: ProfileModel): Promise<void> {
    await this.editUserProfileRepository.editProfile(userId, userProfile)
  }
}

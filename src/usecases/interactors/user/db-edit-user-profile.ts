import { LoadUserByIdRepository } from '@/usecases/boundaries/outputs/database/auth/load-user-by-id-repository'
import { EditUserProfileRepository } from '@/usecases/boundaries/outputs/database/user/edit-user-profile-respository'
import { ProfileModel } from '@/domain/entities/user'
import { EditUserProfile } from '@/usecases/boundaries/inputs/user/edit-user-profile'

export class DbEditUserProfile implements EditUserProfile {
  constructor (
    private readonly editUserProfileRepository: EditUserProfileRepository,
    private readonly loadUserByIdRepository: LoadUserByIdRepository
  ) {}

  async editProfile (userId: string, userProfile: ProfileModel): Promise<boolean> {
    const user = await this.loadUserByIdRepository.loadById(userId)
    if (user) {
      await this.editUserProfileRepository.editProfile(userId, userProfile)
      return true
    }
    return false
  }
}

import { LoadUserByIdRepository } from '@/usecases/boundaries/outputs/database/auth/load-user-by-id-repository'
import { UpdateUserRepository } from '@/usecases/boundaries/outputs/database/user/edit-user-profile-respository'
import { EditUserProfile, EditUserProfileParams } from '@/usecases/boundaries/inputs/user/edit-user-profile'
import { ImageStorage } from '@/usecases/boundaries/outputs/storage/image-storage'

export class DbEditUserProfile implements EditUserProfile {
  constructor (
    private readonly userRepository: LoadUserByIdRepository & UpdateUserRepository,
    private readonly imageStorage: ImageStorage
  ) {}

  async editProfile (params: EditUserProfileParams): Promise<void> {
    const user = await this.userRepository.loadById(params.id)
    if (user) {
      let imageUrl = ''
      if (params.imageBinary) {
        imageUrl = await this.imageStorage.upload(params.imageBinary)
      }
      await this.userRepository.update({ ...params, profile: { ...params.profile, imageUrl } })
    }
  }
}

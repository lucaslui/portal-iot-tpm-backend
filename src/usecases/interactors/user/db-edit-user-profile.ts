import { LoadUserByIdRepository } from '@/usecases/boundaries/outputs/database/auth/load-user-by-id-repository'
import { UpdateUserRepository } from '@/usecases/boundaries/outputs/database/user/edit-user-profile-respository'
import { EditUserProfile, EditUserProfileData } from '@/usecases/boundaries/inputs/user/edit-user-profile'
import { UploadImageStorage } from '@/usecases/boundaries/outputs/storage/upload-image-storage'

export class DbEditUserProfile implements EditUserProfile {
  constructor(
    private readonly userRepository: LoadUserByIdRepository & UpdateUserRepository,
    private readonly imageStorage: UploadImageStorage
  ) {}

  async edit(userId: string, data: EditUserProfileData): Promise<void> {
    const user = await this.userRepository.loadById(userId)
    if (user) {
      let imageUrl = ''
      if (data.imageBinary) {
        imageUrl = await this.imageStorage.upload(data.imageBinary, 'profiles')
      }
      const userDataToUpdate = {
        ...data,
        imageBinary: undefined,
        imageUrl
      }
      await this.userRepository.update(userId, userDataToUpdate)
    }
  }
}

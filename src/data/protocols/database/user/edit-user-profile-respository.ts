import { ProfileModel } from '@/domain/entities/user'

export interface EditUserProfileRepository {
  editProfile: (userId: string, userProfile: ProfileModel) => Promise<void>
}

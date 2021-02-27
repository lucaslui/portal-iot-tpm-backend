import { ProfileModel } from '@/domain/entities/user'

export interface EditUserProfile {
  editProfile: (userId: string, userProfile: ProfileModel) => Promise<boolean>
}

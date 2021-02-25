import { ProfileModel } from '@/domain/entities/user'

export interface EditUserProfile {
  edit: (userId: string, userProfile: ProfileModel) => Promise<ProfileModel>
}

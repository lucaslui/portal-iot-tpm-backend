import { UserProfileModel } from '@/domain/entities/user'

export type EditUserProfileParams = {
  id: string
  name: string
  email: string
  profile: UserProfileModel
  imageBinary?: Buffer
}
export interface EditUserProfile {
  editProfile: (params: EditUserProfileParams) => Promise<void>
}

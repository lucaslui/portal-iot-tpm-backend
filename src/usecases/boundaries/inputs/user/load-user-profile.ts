import { UserProfileModel } from '@/domain/entities/user'

export type UserProfileViewModel = {
  name: string
  email: string
  profile: UserProfileModel
  updatedAt: Date
  createdAt: Date
}
export interface LoadUserProfile {
  loadProfile: (userId: string) => Promise<UserProfileViewModel>
}

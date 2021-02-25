import { ProfileModel } from '@/domain/entities/user'

export interface LoadUserProfile {
  loadProfile: (userId: string) => Promise<ProfileModel>
}

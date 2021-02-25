import { UserModel } from '@/domain/entities/user'

export interface LoadUserProfile {
  loadProfile: (userId: string) => Promise<UserModel>
}

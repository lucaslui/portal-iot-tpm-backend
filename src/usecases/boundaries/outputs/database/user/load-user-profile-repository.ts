import { UserProfileModel } from '@/domain/entities/user'

export interface LoadUserProfileRepository {
  loadProfile (userId: string): Promise<UserProfileModel>
}

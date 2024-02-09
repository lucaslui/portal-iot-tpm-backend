import { ProfileModel } from '@/domain/entities/user'

export interface LoadUserProfileRepository {
  loadProfile (userId: string): Promise<ProfileModel>
}

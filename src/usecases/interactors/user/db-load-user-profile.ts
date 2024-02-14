import { LoadUserProfile, UserProfileViewModel } from '@/usecases/boundaries/inputs/user/load-user-profile'
import { LoadUserByIdRepository } from '@/usecases/boundaries/outputs/database/auth/load-user-by-id-repository'

export class DbLoadUserProfile implements LoadUserProfile {
  constructor (
    private readonly userRepository: LoadUserByIdRepository
  ) {}

  async loadProfile (userId: string): Promise<UserProfileViewModel> {
    const user = await this.userRepository.loadById(userId)
    return {
      name: user.name,
      email: user.email,
      profile: user.profile,
      updatedAt: user.updatedAt,
      createdAt: user.createdAt
    }
  }
}

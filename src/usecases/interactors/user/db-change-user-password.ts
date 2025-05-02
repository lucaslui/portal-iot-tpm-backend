import { HashComparer } from '@/usecases/boundaries/outputs/cryptograph/hash-comparer'
import { Hasher } from '@/usecases/boundaries/outputs/cryptograph/hasher'
import { LoadUserByIdRepository } from '@/usecases/boundaries/outputs/database/auth/load-user-by-id-repository'
import { ChangeUserPasswordRepository } from '@/usecases/boundaries/outputs/database/user/change-user-password-repository'
import { ChangeUserPassword } from '@/usecases/boundaries/inputs/user/change-user-password'

export class DbChangeUserPassword implements ChangeUserPassword {
  constructor(
    private readonly changeUserPasswordRepository: ChangeUserPasswordRepository,
    private readonly loadUserByIdRepository: LoadUserByIdRepository,
    private readonly hashComparer: HashComparer,
    private readonly hasher: Hasher
  ) {}

  async changePassword(userId: string, oldPassword: string, newPassword: string): Promise<boolean> {
    const user = await this.loadUserByIdRepository.loadById(userId)
    if (user) {
      const isAuthorized = await this.hashComparer.compare(oldPassword, user.password)
      if (isAuthorized) {
        const hashedPassword = await this.hasher.hash(newPassword)
        await this.changeUserPasswordRepository.changePassword(userId, hashedPassword)
        return true
      }
    }
    return false
  }
}

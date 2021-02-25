import { HashComparer } from '@/data/protocols/cryptograph/hash-comparer'
import { Hasher } from '@/data/protocols/cryptograph/hasher'
import { LoadUserByIdRepository } from '@/data/protocols/database/auth/load-user-by-id-repository'
import { ChangeUserPasswordRepository } from '@/data/protocols/database/user/change-user-password-repository'
import { ChangeUserPassword } from '@/domain/usecases/user/change-user-password'

export class DbChangeUserPassword implements ChangeUserPassword {
  constructor (
    private readonly changeUserPasswordRepository: ChangeUserPasswordRepository,
    private readonly loadUserByIdRepository: LoadUserByIdRepository,
    private readonly hashComparer: HashComparer,
    private readonly hasher: Hasher
  ) {}

  async changePassword (userId: string, oldPassword: string, newPassword: string): Promise<boolean> {
    const user = await this.loadUserByIdRepository.loadById(userId)
    if (user) {
      const isAuthorized = await this.hashComparer.compare(oldPassword, user.password)
      if (isAuthorized) {
        const hashedPassword = await this.hasher.hash(newPassword)
        await this.changeUserPasswordRepository.changePassword(hashedPassword)
        return true
      }
    }
    return false
  }
}

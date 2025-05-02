import { Decrypter } from '@/usecases/boundaries/outputs/cryptograph/decrypter'
import { LoadUserByTokenRepository } from '@/usecases/boundaries/outputs/database/auth/load-user-by-token-repository'
import { UserModel } from '@/domain/entities/user'
import { LoadUserByToken } from '@/usecases/boundaries/inputs/auth/load-user-by-token'

export class DbLoadUserByToken implements LoadUserByToken {
  constructor(
    private readonly decrypter: Decrypter,
    private readonly loadUserByTokenRepository: LoadUserByTokenRepository
  ) {}

  async load(accessToken: string, role?: string): Promise<UserModel> {
    const decodedToken = await this.decrypter.decrypt(accessToken)
    if (decodedToken) {
      const user = await this.loadUserByTokenRepository.loadByToken(accessToken, role)
      if (user) {
        return user
      }
    }
    return null
  }
}

import { Decrypter } from '@/data/protocols/cryptograph/decrypter'
import { LoadUserByTokenRepository } from '@/data/protocols/database/auth/load-user-by-token-repository'
import { UserModel } from '@/domain/entities/user'
import { LoadUserByToken } from '@/domain/usecases/auth/load-user-by-token'

export class DbLoadUserByToken implements LoadUserByToken {
  constructor (
    private readonly decrypter: Decrypter,
    private readonly loadUserByTokenRepository: LoadUserByTokenRepository
  ) {}

  async load (accessToken: string, role?: string): Promise<UserModel> {
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

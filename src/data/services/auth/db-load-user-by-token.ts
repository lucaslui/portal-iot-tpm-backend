import { Decrypter } from '@/data/protocols/cryptograph/decrypter'
import { LoadUserByTokenRepository } from '@/data/protocols/database/load-user-by-token-repository'
import { UserModel } from '@/domain/entities/user'
import { LoadUserByToken } from '@/domain/usecases/auth/load-user-by-token'

export class DbLoadUserByToken implements LoadUserByToken {
  constructor (
    private readonly decrypter: Decrypter,
    private readonly loadAccountByTokenRepository: LoadUserByTokenRepository
  ) {}

  async load (accessToken: string, role?: string): Promise<UserModel> {
    const decodedToken = await this.decrypter.decrypt(accessToken)
    if (decodedToken) {
      const account = await this.loadAccountByTokenRepository.loadByToken(accessToken, role)
      if (account) {
        return account
      }
    }
    return null
  }
}

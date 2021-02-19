import { Decrypter } from '@/data/protocols/cryptograph/decrypter'
import { LoadAccountByTokenRepository } from '@/data/protocols/database/load-account-by-token-repository'
import { AccountModel } from '@/domain/entities/account'
import { LoadAccountByToken } from '@/domain/usecases/account/load-account-by-token'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (
    private readonly decrypter: Decrypter,
    private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository
  ) {}

  async load (accessToken: string, role?: string): Promise<AccountModel> {
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

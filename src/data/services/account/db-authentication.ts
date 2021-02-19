import { Encrypter } from '@/data/protocols/cryptograph/encrypter'
import { HashComparer } from '@/data/protocols/cryptograph/hash-comparer'
import { LoadAccountByEmailRepository } from '@/data/protocols/database/load-account-by-username-repository'
import { UpdateAccessTokenRepository } from '@/data/protocols/database/update-access-token-repository'
import { Authentication, AuthenticationModel } from '@/domain/usecases/account/authentication'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository
  ) {}

  async auth (authentication: AuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(authentication.username)
    if (account) {
      const isAuthorized = await this.hashComparer.compare(authentication.password, account.password)
      if (isAuthorized) {
        const accessToken = await this.encrypter.encrypt(account.id)
        await this.updateAccessTokenRepository.updateAccessToken(account.id, accessToken)
        return accessToken
      }
    }
    return null
  }
}

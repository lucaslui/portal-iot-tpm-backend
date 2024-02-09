import { Encrypter } from '@/usecases/boundaries/outputs/cryptograph/encrypter'
import { HashComparer } from '@/usecases/boundaries/outputs/cryptograph/hash-comparer'
import { LoadUserByEmailRepository } from '@/usecases/boundaries/outputs/database/auth/load-user-by-username-repository'
import { UpdateAccessTokenRepository } from '@/usecases/boundaries/outputs/database/auth/update-access-token-repository'
import { Authentication, AuthenticationModel } from '@/usecases/boundaries/inputs/auth/authentication'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadUserByEmailRepository: LoadUserByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository
  ) {}

  async auth (authentication: AuthenticationModel): Promise<string> {
    const user = await this.loadUserByEmailRepository.loadByEmail(authentication.email)
    if (user) {
      const isAuthorized = await this.hashComparer.compare(authentication.password, user.password)
      if (isAuthorized) {
        const accessToken = await this.encrypter.encrypt(user.id)
        await this.updateAccessTokenRepository.updateAccessToken(user.id, accessToken)
        return accessToken
      }
    }
    return null
  }
}

import { Encrypter } from '@/data/protocols/cryptograph/encrypter'
import { Hasher } from '@/data/protocols/cryptograph/hasher'
import { CreateUserRepository } from '@/data/protocols/database/auth/create-user-repository'
import { LoadUserByEmailRepository } from '@/data/protocols/database/auth/load-user-by-email-repository'
import { UpdateAccessTokenRepository } from '@/data/protocols/database/auth/update-access-token-repository'
import { CreateUser, CreateUserParamsModel } from '@/domain/usecases/auth/create-user'

export class DbCreateUser implements CreateUser {
  constructor (
    private readonly hasher: Hasher,
    private readonly encrypter: Encrypter,
    private readonly createUserRepository: CreateUserRepository,
    private readonly loadUserByEmailRepository: LoadUserByEmailRepository,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository
  ) { }

  async create (createUserParams: CreateUserParamsModel): Promise<string> {
    const user = await this.loadUserByEmailRepository.loadByEmail(createUserParams.email)
    if (!user) {
      const hashedPassword = await this.hasher.hash(createUserParams.password)
      const user = await this.createUserRepository.create(Object.assign({}, createUserParams, { password: hashedPassword }))
      const accessToken = await this.encrypter.encrypt(user.id)
      await this.updateAccessTokenRepository.updateAccessToken(user.id, accessToken)
      return accessToken
    }
    return null
  }
}

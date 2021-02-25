import { Hasher } from '@/data/protocols/cryptograph/hasher'
import { CreateUserRepository } from '@/data/protocols/database/create-user-repository'
import { LoadUserByEmailRepository } from '@/data/protocols/database/load-user-by-email-repository'
import { UserModel } from '@/domain/entities/user'
import { CreateUser, CreateUserParamsModel } from '@/domain/usecases/auth/create-user'

export class DbCreateUser implements CreateUser {
  constructor (
    private readonly hasher: Hasher,
    private readonly createUserRepository: CreateUserRepository,
    private readonly loadAccountByEmailRepository: LoadUserByEmailRepository
  ) { }

  async create (createUserParams: CreateUserParamsModel): Promise<UserModel> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(createUserParams.email)
    if (!account) {
      const hashedPassword = await this.hasher.hash(createUserParams.password)
      const newAccount = await this.createUserRepository.create(Object.assign({}, createUserParams, { password: hashedPassword }))
      return newAccount
    }
    return null
  }
}

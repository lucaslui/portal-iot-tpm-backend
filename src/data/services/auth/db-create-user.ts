import { Hasher } from '@/data/protocols/cryptograph/hasher'
import { CreateUserRepository } from '@/data/protocols/database/auth/create-user-repository'
import { LoadUserByEmailRepository } from '@/data/protocols/database/auth/load-user-by-email-repository'
import { CreateUser, CreateUserParamsModel } from '@/domain/usecases/auth/create-user'

export class DbCreateUser implements CreateUser {
  constructor (
    private readonly hasher: Hasher,
    private readonly createUserRepository: CreateUserRepository,
    private readonly loadUserByEmailRepository: LoadUserByEmailRepository
  ) { }

  async create (createUserParams: CreateUserParamsModel): Promise<boolean> {
    const user = await this.loadUserByEmailRepository.loadByEmail(createUserParams.email)
    let isValid = false
    if (!user) {
      const hashedPassword = await this.hasher.hash(createUserParams.password)
      isValid = await this.createUserRepository.create({ ...createUserParams, password: hashedPassword })
    }
    return isValid
  }
}

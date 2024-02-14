import { Hasher } from '@/usecases/boundaries/outputs/cryptograph/hasher'
import { AddUserRepository } from '@/usecases/boundaries/outputs/database/auth/create-user-repository'
import { LoadUserByEmailRepository } from '@/usecases/boundaries/outputs/database/auth/load-user-by-email-repository'
import { CreateUser, AddUserParamsModel } from '@/usecases/boundaries/inputs/auth/create-user'

export class DbCreateUser implements CreateUser {
  constructor (
    private readonly hasher: Hasher,
    private readonly createUserRepository: AddUserRepository,
    private readonly loadUserByEmailRepository: LoadUserByEmailRepository
  ) { }

  async create (createUserParams: AddUserParamsModel): Promise<boolean> {
    const user = await this.loadUserByEmailRepository.loadByEmail(createUserParams.email)
    let isValid = false
    if (!user) {
      const hashedPassword = await this.hasher.hash(createUserParams.password)
      isValid = await this.createUserRepository.add({ ...createUserParams, password: hashedPassword })
    }
    return isValid
  }
}

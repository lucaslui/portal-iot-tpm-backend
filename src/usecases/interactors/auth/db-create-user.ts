import { Hasher } from '@/usecases/boundaries/outputs/cryptograph/hasher'
import { AddUserRepository } from '@/usecases/boundaries/outputs/database/auth/add-user-repository'
import { LoadUserByEmailRepository } from '@/usecases/boundaries/outputs/database/auth/load-user-by-email-repository'
import { AddUser, AddUserParamsModel } from '@/usecases/boundaries/inputs/auth/add-user'

export class DbCreateUser implements AddUser {
  constructor(
    private readonly hasher: Hasher,
    private readonly createUserRepository: AddUserRepository,
    private readonly loadUserByEmailRepository: LoadUserByEmailRepository
  ) {}

  async add(createUserParams: AddUserParamsModel): Promise<boolean> {
    const user = await this.loadUserByEmailRepository.loadByEmail(createUserParams.email)
    let isValid = false
    if (!user) {
      const hashedPassword = await this.hasher.hash(createUserParams.password)
      isValid = await this.createUserRepository.add({
        ...createUserParams,
        password: hashedPassword
      })
    }
    return isValid
  }
}

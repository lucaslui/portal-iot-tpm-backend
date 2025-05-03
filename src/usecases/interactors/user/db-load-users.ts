import { LoadUsersRepository } from '@/usecases/boundaries/outputs/database/user/load-users-repository'
import { UserModel } from '@/domain/entities/user'
import { LoadUsers, LoadUsersQueryModel } from '@/usecases/boundaries/inputs/user/load-users'

export class DbLoadUsers implements LoadUsers {
  constructor(private readonly loadUsersRepository: LoadUsersRepository) {}

  async loadUsers(query?: LoadUsersQueryModel): Promise<UserModel[]> {
    const users = await this.loadUsersRepository.loadUsers(query)
    if (users) {
      return users
    }
    return null
  }
}

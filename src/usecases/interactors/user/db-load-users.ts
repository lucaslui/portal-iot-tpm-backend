import { LoadUsersRepository } from '@/usecases/boundaries/outputs/database/user/load-users-repository'
import { UserModel } from '@/domain/entities/user'
import { LoadUsers } from '@/usecases/boundaries/inputs/user/load-users'

export class DbLoadUsers implements LoadUsers {
  constructor(private readonly loadUsersRepository: LoadUsersRepository) {}

  async loadUsers(page?: number): Promise<UserModel[]> {
    const users = await this.loadUsersRepository.loadUsers(page)
    if (users) {
      return users
    }
    return null
  }
}

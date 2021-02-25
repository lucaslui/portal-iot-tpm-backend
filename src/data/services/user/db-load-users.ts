import { LoadUsersRepository } from '@/data/protocols/database/user/load-users-repository'
import { UserModel } from '@/domain/entities/user'
import { LoadUsers } from '@/domain/usecases/user/load-users'

export class DbLoadUsers implements LoadUsers {
  constructor (
    private readonly loadUsersRepository: LoadUsersRepository
  ) {}

  async loadUsers (page?: number): Promise<UserModel[]> {
    const users = await this.loadUsersRepository.loadUsers(page)
    if (users) {
      return users
    }
    return null
  }
}

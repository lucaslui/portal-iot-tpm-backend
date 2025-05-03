import { UserModel } from '@/domain/entities/user'
import { LoadUsersQueryModel } from '@/usecases/boundaries/inputs/user/load-users'

export interface LoadUsersRepository {
  loadUsers: (query?: LoadUsersQueryModel) => Promise<UserModel[]>
}

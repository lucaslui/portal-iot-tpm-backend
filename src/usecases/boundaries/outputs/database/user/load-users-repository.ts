import { UserModel } from '@/domain/entities/user'

export interface LoadUsersRepository {
  loadUsers: (page?: number) => Promise<UserModel[]>
}

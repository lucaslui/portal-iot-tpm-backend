import { UserModel } from '@/domain/entities/user'

export type LoadUsersQueryModel = {
  page?: number
  limit?: number
}

export interface LoadUsers {
  loadUsers: (query?: LoadUsersQueryModel) => Promise<UserModel[]>
}

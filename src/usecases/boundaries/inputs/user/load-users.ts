import { UserModel } from '@/domain/entities/user'

export interface LoadUsers {
  loadUsers: (page?: number) => Promise<UserModel[]>
}

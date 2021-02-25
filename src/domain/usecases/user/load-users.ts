import { UserModel } from '@/domain/entities/user'

export interface LoadUsers {
  load: (page?: number) => Promise<UserModel[]>
}

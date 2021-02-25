import { UserModel } from '@/domain/entities/user'

export interface LoadUserByIdRepository {
  loadById: (userId: string) => Promise<UserModel>
}

import { UserModel } from '@/domain/entities/user'

export interface LoadUserByIdRepository {
  loadById: (accountId: string) => Promise<UserModel>
}

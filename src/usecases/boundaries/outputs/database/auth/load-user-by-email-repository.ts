import { UserModel } from '@/domain/entities/user'

export interface LoadUserByEmailRepository {
  loadByEmail(email: string): Promise<UserModel>
}

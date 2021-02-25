import { UserModel } from '@/domain/entities/user'

export interface LoadUserByTokenRepository {
  loadByToken: (token: string, role?: string) => Promise<UserModel>
}

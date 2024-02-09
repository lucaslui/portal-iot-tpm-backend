import { UserModel } from '@/domain/entities/user'

export interface LoadUserByToken {
  load: (accessToken: string, role?: string) => Promise<UserModel>
}

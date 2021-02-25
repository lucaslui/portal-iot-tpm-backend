import { UserModel } from '../../entities/user'

export interface LoadUserByToken {
  load: (accessToken: string, role?: string) => Promise<UserModel>
}

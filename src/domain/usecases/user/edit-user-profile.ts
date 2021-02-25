import { UserModel } from '@/domain/entities/user'

export interface EditUserProfile {
  edit: (user: UserModel) => Promise<UserModel>
}

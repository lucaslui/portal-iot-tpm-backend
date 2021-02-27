import { ProfileModel, UserModel } from '@/domain/entities/user'

export type CreateUserParamsModel = {
  name: string
  email: string
  profile: ProfileModel
  password: string
  createdAt: Date
}

export interface CreateUser {
  create (createUserParams: CreateUserParamsModel): Promise<UserModel>
}

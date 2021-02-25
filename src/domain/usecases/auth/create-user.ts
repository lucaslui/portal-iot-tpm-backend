import { UserModel } from '@/domain/entities/user'

export type CreateUserParamsModel = {
  name: string
  email: string
  password: string
}

export interface CreateUser {
  create (createUserParams: CreateUserParamsModel): Promise<UserModel>
}

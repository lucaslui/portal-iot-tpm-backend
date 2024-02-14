import { UserProfileModel } from '@/domain/entities/user'

export type AddUserParamsModel = {
  name: string
  email: string
  profile: UserProfileModel
  password: string
}

export interface CreateUser {
  create (params: AddUserParamsModel): Promise<boolean>
}

import { AddUserParamsModel } from '@/usecases/boundaries/inputs/auth/create-user'

export interface AddUserRepository {
  add (createUserParams: AddUserParamsModel): Promise<boolean>
}

import { AddUserParamsModel } from '@/usecases/boundaries/inputs/auth/add-user'

export interface AddUserRepository {
  add (params: AddUserParamsModel): Promise<boolean>
}

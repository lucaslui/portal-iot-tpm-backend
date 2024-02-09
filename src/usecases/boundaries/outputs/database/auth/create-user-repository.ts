import { CreateUserParamsModel } from '@/usecases/boundaries/inputs/auth/create-user'

export interface CreateUserRepository {
  create (createUserParams: CreateUserParamsModel): Promise<boolean>
}

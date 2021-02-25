import { UserModel } from '@/domain/entities/user'
import { CreateUserParamsModel } from '@/domain/usecases/auth/create-user'

export interface CreateUserRepository {
  create (createUserParams: CreateUserParamsModel): Promise<UserModel>
}

import { DbChangeUserPassword } from '@/usecases/interactors/user/db-change-user-password'
import { ChangeUserPassword } from '@/usecases/boundaries/inputs/user/change-user-password'
import { BcryptAdapter } from '@/infrastructure/criptography/bcrypt-adapter'
import { UserMongoRepository } from '@/infrastructure/database/mongodb/user-mongo-repository'

export const makeDbChangeUserPassword = (): ChangeUserPassword => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const userMongoRepository = new UserMongoRepository()
  return new DbChangeUserPassword(userMongoRepository, userMongoRepository, bcryptAdapter, bcryptAdapter)
}

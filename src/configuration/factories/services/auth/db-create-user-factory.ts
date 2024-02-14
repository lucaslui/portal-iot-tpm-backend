import { DbCreateUser } from '@/usecases/interactors/auth/db-create-user'
import { AddUser } from '@/usecases/boundaries/inputs/auth/add-user'
import { BcryptAdapter } from '@/infrastructure/criptography/bcrypt-adapter'
import { UserMongoRepository } from '@/infrastructure/database/mongodb/user-mongo-repository'

export const makeDbCreateUser = (): AddUser => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const userMongoRepository = new UserMongoRepository()
  return new DbCreateUser(bcryptAdapter, userMongoRepository, userMongoRepository)
}

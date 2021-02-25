import { DbCreateUser } from '@/data/services/auth/db-create-user'
import { CreateUser } from '@/domain/usecases/auth/create-user'
import { BcryptAdapter } from '@/infrastructure/criptography/bcrypt-adapter'
import { UserMongoRepository } from '@/infrastructure/database/mongodb/user-mongo-repository'

export const makeDbCreateUser = (): CreateUser => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountMongoRepository = new UserMongoRepository()
  return new DbCreateUser(bcryptAdapter, accountMongoRepository, accountMongoRepository)
}

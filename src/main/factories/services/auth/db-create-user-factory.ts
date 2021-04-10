import { DbCreateUser } from '@/data/services/auth/db-create-user'
import { CreateUser } from '@/domain/usecases/auth/create-user'
import { BcryptAdapter } from '@/infrastructure/criptography/bcrypt-adapter'
import { JwtAdapter } from '@/infrastructure/criptography/jwt-adapter'
import { UserMongoRepository } from '@/infrastructure/database/mongodb/user-mongo-repository'

import env from '@/main/config/env'

export const makeDbCreateUser = (): CreateUser => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const userMongoRepository = new UserMongoRepository()
  return new DbCreateUser(bcryptAdapter, jwtAdapter, userMongoRepository, userMongoRepository, userMongoRepository)
}

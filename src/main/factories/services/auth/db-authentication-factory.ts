
import { DbAuthentication } from '@/data/services/auth/db-authentication'
import { Authentication } from '@/domain/usecases/auth/authentication'
import { BcryptAdapter } from '@/infrastructure/criptography/bcrypt-adapter'
import { JwtAdapter } from '@/infrastructure/criptography/jwt-adapter'
import { UserMongoRepository } from '@/infrastructure/database/mongodb/user-mongo-repository'

import env from '@/main/config/env'

export const makeDbAuthentication = (): Authentication => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const userMongoRepository = new UserMongoRepository()
  return new DbAuthentication(userMongoRepository, bcryptAdapter, jwtAdapter, userMongoRepository)
}

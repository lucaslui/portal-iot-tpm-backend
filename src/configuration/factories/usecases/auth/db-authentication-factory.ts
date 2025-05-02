import { DbAuthentication } from '@/usecases/interactors/auth/db-authentication'
import { Authentication } from '@/usecases/boundaries/inputs/auth/authentication'
import { BcryptAdapter } from '@/infrastructure/criptography/bcrypt-adapter'
import { JwtAdapter } from '@/infrastructure/criptography/jwt-adapter'
import { UserMongoRepository } from '@/infrastructure/database/mongodb/user-mongo-repository'

import env from '@/configuration/config/env'

export const makeDbAuthentication = (): Authentication => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const userMongoRepository = new UserMongoRepository()
  return new DbAuthentication(userMongoRepository, bcryptAdapter, jwtAdapter, userMongoRepository)
}

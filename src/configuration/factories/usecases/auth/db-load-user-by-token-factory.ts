import { DbLoadUserByToken } from '@/usecases/interactors/auth/db-load-user-by-token'
import { LoadUserByToken } from '@/usecases/boundaries/inputs/auth/load-user-by-token'
import { JwtAdapter } from '@/infrastructure/criptography/jwt-adapter'
import { UserMongoRepository } from '@/infrastructure/database/mongodb/user-mongo-repository'

import env from '@/configuration/config/env'

export const makeDbLoadAccountByToken = (): LoadUserByToken => {
  const secret = env.jwtSecret
  const jwtAdapter = new JwtAdapter(secret)
  const userMongoRepository = new UserMongoRepository()
  return new DbLoadUserByToken(jwtAdapter, userMongoRepository)
}

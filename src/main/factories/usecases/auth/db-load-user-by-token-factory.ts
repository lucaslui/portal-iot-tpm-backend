
import { DbLoadUserByToken } from '@/data/services/auth/db-load-user-by-token'
import { LoadUserByToken } from '@/domain/usecases/auth/load-user-by-token'
import { JwtAdapter } from '@/infrastructure/criptography/jwt-adapter'
import { UserMongoRepository } from '@/infrastructure/database/mongodb/user-mongo-repository'

import env from '@/main/config/env'

export const makeDbLoadAccountByToken = (): LoadUserByToken => {
  const secret = env.jwtSecret
  const jwtAdapter = new JwtAdapter(secret)
  const userMongoRepository = new UserMongoRepository()
  return new DbLoadUserByToken(jwtAdapter, userMongoRepository)
}

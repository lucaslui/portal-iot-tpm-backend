
import { DbLoadAccountByToken } from '@/data/services/account/db-load-account-by-token'
import { LoadAccountByToken } from '@/domain/usecases/account/load-account-by-token'
import { JwtAdapter } from '@/infrastructure/criptography/jwt-adapter'
import { AccountMongoRepository } from '@/infrastructure/database/mongodb/account/account-mongo-repository'
import env from '../../../config/env'

export const makeDbLoadAccountByToken = (): LoadAccountByToken => {
  const secret = env.jwtSecret
  const jwtAdapter = new JwtAdapter(secret)
  const accountMongoRepository = new AccountMongoRepository()
  return new DbLoadAccountByToken(jwtAdapter, accountMongoRepository)
}

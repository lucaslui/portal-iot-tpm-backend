import { DbAuthentication } from '@/data/services/account/db-authentication'
import { Authentication } from '@/domain/usecases/account/authentication'
import { BcryptAdapter } from '@/infrastructure/criptography/bcrypt-adapter'
import { JwtAdapter } from '@/infrastructure/criptography/jwt-adapter'
import { AccountMongoRepository } from '@/infrastructure/database/mongodb/account/account-mongo-repository'
import env from '../../../config/env'

export const makeDbAuthentication = (): Authentication => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const accountMongoRepository = new AccountMongoRepository()
  return new DbAuthentication(accountMongoRepository, bcryptAdapter, jwtAdapter, accountMongoRepository)
}

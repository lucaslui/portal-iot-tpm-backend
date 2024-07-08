import { Middleware } from '@/application/protocols/middleware'
import { AuthMiddleware } from '../../../application/middlewares/auth-middleware'
import { makeDbLoadAccountByToken } from '../usecases/auth/db-load-user-by-token-factory'

export const makeAuthMiddleware = (role?: string): Middleware => {
  const loadAccountByToken = makeDbLoadAccountByToken()
  return new AuthMiddleware(loadAccountByToken, role)
}

import { Express } from 'express'
import { loginRouter } from '../routes/auth/login-routes'
import { signupRouter } from '../routes/auth/signup-routes'

export default (app: Express): void => {
  app.use('/api', signupRouter)
  app.use('/api', loginRouter)
}

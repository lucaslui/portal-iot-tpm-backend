import { Express } from 'express'
import { loginRouter } from '../routes/account/login-routes'

export default (app: Express): void => {
  app.use('/api', loginRouter)
}

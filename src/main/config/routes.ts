import { authRouter } from '../routes/auth-routes'
import { userRouter } from '../routes/user-routes'
import { articleRouter } from '../routes/article-routes'
import { categoryRouter } from '../routes/category-routes'

import { Express } from 'express'

export default (app: Express): void => {
  app.use('/api', authRouter)
  app.use('/api/users', userRouter)
  app.use('/api/articles', articleRouter)
  app.use('/api/categories', categoryRouter)
}

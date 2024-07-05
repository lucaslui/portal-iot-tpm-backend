import { authRouter } from '../routes/auth-routes'
import { userRouter } from '../routes/user-routes'
import { articleRouter } from '../routes/article-routes'
import { courseRouter } from '@/configuration/routes/course-routes'
import { categoryRouter } from '../routes/category-routes'

import { Express } from 'express'

export default (app: Express): void => {
  app.use('/api', authRouter)
  app.use('/api/users', userRouter)
  app.use('/api/articles', articleRouter)
  app.use('/api/courses', courseRouter)
  app.use('/api/categories', categoryRouter)
}

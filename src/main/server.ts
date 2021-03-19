import 'module-alias/register'
import { MongoHelper } from '@/infrastructure/database/mongodb/mongo-helper'
import env from './config/env'

MongoHelper.connect(env.mongoUrl)
  .then(async () => {
    console.log('Mongodb connection successful')
    const app = (await import('./config/app')).default
    app.listen(env.port, () => console.log(`Server running at http://localhost:${env.port}`))
  })
  .catch(console.error)

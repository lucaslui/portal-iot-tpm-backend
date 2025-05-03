import 'module-alias/register'
import env from './configuration/config/env'
import { MongoInstance } from '@/infrastructure/database/mongodb/mongo-instance'

MongoInstance.connect(env.mongoUrl)
  .then(async () => {
    console.log('Mongodb connection successful')
    const app = (await import('./configuration/config/app')).default
    app.listen(env.port, () => console.log(`Server running at http://localhost:${env.port}`))
  })
  .catch(console.error)

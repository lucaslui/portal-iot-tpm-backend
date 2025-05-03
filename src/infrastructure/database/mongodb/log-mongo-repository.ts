import { LogErrorRepository } from '@/usecases/boundaries/outputs/database/system/log-error-repository'
import { MongoInstance } from '@/infrastructure/database/mongodb/mongo-instance'

export class LogMongoRepository implements LogErrorRepository {
  async logError(stack: string): Promise<void> {
    const errorCollection = await MongoInstance.getCollection('errors')
    await errorCollection.insertOne({
      stack,
      date: new Date()
    })
  }
}

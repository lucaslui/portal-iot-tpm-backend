import { LogErrorRepository } from '@/usecases/boundaries/outputs/database/system/log-error-repository'
import { MongoHelper } from './mongo-helper'

export class LogMongoRepository implements LogErrorRepository {
  async logError (stack: string): Promise<void> {
    const errorCollection = await MongoHelper.getCollection('errors')
    await errorCollection.insertOne({
      stack,
      date: new Date()
    })
  }
}

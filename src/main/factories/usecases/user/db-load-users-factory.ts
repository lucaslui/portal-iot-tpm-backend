import { DbLoadUsers } from '@/data/services/user/db-load-users'
import { LoadUsers } from '@/domain/usecases/user/load-users'
import { UserMongoRepository } from '@/infrastructure/database/mongodb/user-mongo-repository'

export const makeDbLoadUsers = (): LoadUsers => {
  const userMongoRepository = new UserMongoRepository()
  return new DbLoadUsers(userMongoRepository)
}

import { DbLoadUsers } from '@/usecases/interactors/user/db-load-users'
import { LoadUsers } from '@/usecases/boundaries/inputs/user/load-users'
import { UserMongoRepository } from '@/infrastructure/database/mongodb/user-mongo-repository'

export const makeDbLoadUsers = (): LoadUsers => {
  const userMongoRepository = new UserMongoRepository()
  return new DbLoadUsers(userMongoRepository)
}

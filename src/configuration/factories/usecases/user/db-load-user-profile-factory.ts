import { DbLoadUserProfile } from '@/usecases/interactors/user/db-load-user-profile'
import { LoadUserProfile } from '@/usecases/boundaries/inputs/user/load-user-profile'
import { UserMongoRepository } from '@/infrastructure/database/mongodb/user-mongo-repository'

export const makeDbLoadUserProfile = (): LoadUserProfile => {
  const userMongoRepository = new UserMongoRepository()
  return new DbLoadUserProfile(userMongoRepository)
}

import { DbLoadUserProfile } from '@/data/services/user/db-load-user-profile'
import { LoadUserProfile } from '@/domain/usecases/user/load-user-profile'
import { UserMongoRepository } from '@/infrastructure/database/mongodb/user-mongo-repository'

export const makeDbLoadUserProfile = (): LoadUserProfile => {
  const userMongoRepository = new UserMongoRepository()
  return new DbLoadUserProfile(userMongoRepository)
}

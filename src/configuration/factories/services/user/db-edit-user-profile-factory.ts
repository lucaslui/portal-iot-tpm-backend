import { DbEditUserProfile } from '@/usecases/interactors/user/db-edit-user-profile'
import { EditUserProfile } from '@/usecases/boundaries/inputs/user/edit-user-profile'
import { UserMongoRepository } from '@/infrastructure/database/mongodb/user-mongo-repository'

export const makeDbEditUserProfile = (): EditUserProfile => {
  const userMongoRepository = new UserMongoRepository()
  return new DbEditUserProfile(userMongoRepository, userMongoRepository)
}

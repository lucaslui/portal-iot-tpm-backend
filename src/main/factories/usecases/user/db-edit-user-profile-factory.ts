import { DbEditUserProfile } from '@/data/services/user/db-edit-user-profile'
import { EditUserProfile } from '@/domain/usecases/user/edit-user-profile'
import { UserMongoRepository } from '@/infrastructure/database/mongodb/user-mongo-repository'

export const makeDbEditUserProfile = (): EditUserProfile => {
  const userMongoRepository = new UserMongoRepository()
  return new DbEditUserProfile(userMongoRepository)
}

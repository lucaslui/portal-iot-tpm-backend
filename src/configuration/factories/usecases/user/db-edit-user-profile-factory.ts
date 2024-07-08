import { DbEditUserProfile } from '@/usecases/interactors/user/db-edit-user-profile'
import { EditUserProfile } from '@/usecases/boundaries/inputs/user/edit-user-profile'
import { UserMongoRepository } from '@/infrastructure/database/mongodb/user-mongo-repository'
import { CloudinaryImageStorage } from '@/infrastructure/storage/cloudinary-storage'

import env from '@/configuration/config/env'

export const makeDbEditUserProfile = (): EditUserProfile => {
  const cloudinaryImageStorage = new CloudinaryImageStorage(
    env.cloudinaryCloudName,
    env.cloudinaryApiKey,
    env.cloudinaryApiSecret
  )
  const userMongoRepository = new UserMongoRepository()
  return new DbEditUserProfile(userMongoRepository, cloudinaryImageStorage)
}

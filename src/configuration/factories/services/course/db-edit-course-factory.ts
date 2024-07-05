
import { CloudinaryImageStorage } from '@/infrastructure/storage/cloudinary-storage'
import { CourseMongoRepository } from '@/infrastructure/database/mongodb/course-mongo-repository'
import { EditCourse } from '@/usecases/boundaries/inputs/course/edit-course'
import { DbEditCourse } from '@/usecases/interactors/course/db-edit-course'

import env from '@/configuration/config/env'

export const makeDbEditCourse = (): EditCourse => {
  const cloudinaryImageStorage = new CloudinaryImageStorage(
    env.cloudinaryCloudName,
    env.cloudinaryApiKey,
    env.cloudinaryApiSecret
  )
  const articleMongoRepository = new CourseMongoRepository()
  return new DbEditCourse(articleMongoRepository, cloudinaryImageStorage)
}

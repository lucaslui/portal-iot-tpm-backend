
import { CloudinaryImageStorage } from '@/infrastructure/storage/cloudinary-storage'
import { CourseMongoRepository } from '@/infrastructure/database/mongodb/course-mongo-repository'
import { AddCourse } from '@/usecases/boundaries/inputs/course/add-course'
import { DbAddCourse } from '@/usecases/interactors/course/db-add-course'

import env from '@/configuration/config/env'

export const makeDbAddCourse = (): AddCourse => {
  const cloudinaryImageStorage = new CloudinaryImageStorage(
    env.cloudinaryCloudName,
    env.cloudinaryApiKey,
    env.cloudinaryApiSecret
  )
  const articleMongoRepository = new CourseMongoRepository()
  return new DbAddCourse(articleMongoRepository, cloudinaryImageStorage)
}

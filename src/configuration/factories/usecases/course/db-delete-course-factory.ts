import { CourseMongoRepository } from '@/infrastructure/database/mongodb/course-mongo-repository'
import { DeleteCourse } from '@/usecases/boundaries/inputs/course/delete-course'
import { DbDeleteCourse } from '@/usecases/interactors/course/db-delete-course'

export const makeDbDeleteCourse = (): DeleteCourse => {
  const articleMongoRepository = new CourseMongoRepository()
  return new DbDeleteCourse(articleMongoRepository)
}

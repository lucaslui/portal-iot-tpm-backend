import { CourseMongoRepository } from '@/infrastructure/database/mongodb/course-mongo-repository'
import { LoadCourses } from '@/usecases/boundaries/inputs/course/load-courses'
import { DbLoadCourses } from '@/usecases/interactors/course/db-load-courses'

export const makeDbLoadCourses = (): LoadCourses => {
  const articleMongoRepository = new CourseMongoRepository()
  return new DbLoadCourses(articleMongoRepository)
}

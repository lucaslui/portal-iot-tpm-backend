import { CourseMongoRepository } from '@/infrastructure/database/mongodb/course-mongo-repository'
import { LoadCourseById } from '@/usecases/boundaries/inputs/course/load-course-by-id'
import { DbLoadCourseById } from '@/usecases/interactors/course/db-load-course-by-id'

export const makeDbLoadCourseById = (): LoadCourseById => {
  const articleMongoRepository = new CourseMongoRepository()
  return new DbLoadCourseById(articleMongoRepository)
}

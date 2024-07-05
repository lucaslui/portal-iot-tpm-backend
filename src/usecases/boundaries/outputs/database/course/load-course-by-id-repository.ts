import { CourseViewModel, LoadCourseByIdParams } from '@/usecases/boundaries/inputs/course/load-course-by-id'

export interface LoadCourseByIdRepository {
  loadById: (params: LoadCourseByIdParams) => Promise<CourseViewModel>
}

import { LoadCoursesQueryModel, LoadCoursesResponseModel } from '@/usecases/boundaries/inputs/course/load-courses'

export interface LoadPortalCoursesRepository {
  loadCourses: (query?: LoadCoursesQueryModel) => Promise<LoadCoursesResponseModel>
}

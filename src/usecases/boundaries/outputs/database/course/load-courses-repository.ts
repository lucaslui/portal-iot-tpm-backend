import { LoadCoursesQueryModel, LoadCoursesResponseModel } from '@/usecases/boundaries/inputs/course/load-courses'

export interface LoadCoursesRepository {
  load: (query?: LoadCoursesQueryModel) => Promise<LoadCoursesResponseModel>
}

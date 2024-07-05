import { CourseModel } from '@/domain/entities/course'
import { PaginationModel } from '@/usecases/shared/pagination'

export type LoadCoursesQueryModel = {
  page?: number
  limit?: number
  type?: string
  userId?: string
  search?: string
  categoryIds?: string[]
  month?: number
  year?: number
}

export type LoadCoursesResponseModel = PaginationModel<CourseModel[]>

export interface LoadCourses {
  load: (query?: LoadCoursesQueryModel) => Promise<LoadCoursesResponseModel>
}

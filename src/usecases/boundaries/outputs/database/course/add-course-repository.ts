import { CourseModel } from '@/domain/entities/course'

export type AddCourseRepositoryModel = Omit<CourseModel, 'id' | 'updatedAt' | 'createdAt' >

export interface AddCourseRepository {
  add (article: AddCourseRepositoryModel): Promise<CourseModel>
}

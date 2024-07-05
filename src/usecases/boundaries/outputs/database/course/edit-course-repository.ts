import { CourseModel } from '@/domain/entities/course'

export type EditCourseRepositoryModel = Omit<CourseModel, 'id' | 'userId' | 'updatedAt' | 'createdAt' >

export interface EditCourseRepository {
  edit: (articleId: string, newCourse: EditCourseRepositoryModel) => Promise<void>
}

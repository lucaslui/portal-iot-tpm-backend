import { CourseModel } from '@/domain/entities/course'

export type EditCourseModel = Omit<CourseModel, 'id' | 'userId' | 'imageUrl' | 'updatedAt' | 'createdAt'> & {
  imageBinary?: {
    fieldname: string
    originalname: string
    encoding: string
    mimetype: string
    buffer: Buffer
    size: number
  }
}

export interface EditCourse {
  edit: (courseId: string, newCourse: EditCourseModel, userId: string) => Promise<boolean>
}

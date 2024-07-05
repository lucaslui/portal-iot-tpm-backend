import { CourseModel } from '@/domain/entities/course'

export type AddCourseModel = Omit<CourseModel, 'id' | 'imageUrl' | 'updatedAt' | 'createdAt'> & {
  imageBinary?: {
    fieldname: string
    originalname: string
    encoding: string
    mimetype: string
    buffer: Buffer
    size: number
  }
}

export interface AddCourse {
  add: (article: AddCourseModel) => Promise<CourseModel>
}

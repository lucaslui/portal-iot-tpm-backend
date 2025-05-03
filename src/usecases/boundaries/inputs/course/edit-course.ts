import { CourseModel } from '@/domain/entities/course'
import { ImageBinary } from '@/usecases/models/image-binary'

export type EditCourseModel = Omit<CourseModel, 'id' | 'userId' | 'imageUrl' | 'updatedAt' | 'createdAt'> & {
  imageBinary?: ImageBinary
}

export interface EditCourse {
  edit: (courseId: string, newCourse: EditCourseModel, userId: string) => Promise<boolean>
}

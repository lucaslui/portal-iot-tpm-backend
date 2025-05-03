import { CourseModel } from '@/domain/entities/course'
import { ImageBinary } from '@/usecases/models/image-binary'

export type AddCourseModel = Omit<CourseModel, 'id' | 'imageUrl' | 'updatedAt' | 'createdAt'> & {
  imageBinary?: ImageBinary
}

export interface AddCourse {
  add: (article: AddCourseModel) => Promise<CourseModel>
}

import { EditCourse, EditCourseModel } from '@/usecases/boundaries/inputs/course/edit-course'
import { EditCourseRepository, EditCourseRepositoryModel } from '@/usecases/boundaries/outputs/database/course/edit-course-repository'
import { LoadCourseByIdRepository } from '@/usecases/boundaries/outputs/database/course/load-course-by-id-repository'
import { DeleteImageStorage } from '@/usecases/boundaries/outputs/storage/delete-image-storage'
import { UploadImageStorage } from '@/usecases/boundaries/outputs/storage/upload-image-storage'

export class DbEditCourse implements EditCourse {
  constructor(
    private readonly courseRepository: LoadCourseByIdRepository & EditCourseRepository,
    private readonly imageRepository: UploadImageStorage & DeleteImageStorage
  ) {}

  async edit(courseId: string, newCourse: EditCourseModel, userId: string): Promise<boolean> {
    const oldCourse = await this.courseRepository.loadById({ courseId })
    let newCourseRepositoryModel: EditCourseRepositoryModel = { ...newCourse }
    if (oldCourse.user.id.toString() === userId.toString()) {
      if (newCourse.imageBinary) {
        const imageUrl = await this.imageRepository.upload(newCourse.imageBinary, 'thumbnails')
        if (oldCourse.imageUrl) {
          const fileId = oldCourse.imageUrl.split('/').pop()
          await this.imageRepository.delete(fileId)
        }
        newCourseRepositoryModel = { ...newCourseRepositoryModel, imageUrl }
      }
      await this.courseRepository.edit(courseId, newCourseRepositoryModel)
      return true
    }
    return false
  }
}

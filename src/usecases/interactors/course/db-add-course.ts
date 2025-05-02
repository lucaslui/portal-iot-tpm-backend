import { CourseModel } from '@/domain/entities/course'
import { AddCourse, AddCourseModel } from '@/usecases/boundaries/inputs/course/add-course'
import { AddCourseRepository } from '@/usecases/boundaries/outputs/database/course/add-course-repository'
import { UploadImageStorage } from '@/usecases/boundaries/outputs/storage/upload-image-storage'

export class DbAddCourse implements AddCourse {
  constructor(
    private readonly articleRepository: AddCourseRepository,
    private readonly imageRepository: UploadImageStorage
  ) {}

  async add(article: AddCourseModel): Promise<CourseModel> {
    let imageUrl = ''
    if (article.imageBinary) {
      imageUrl = await this.imageRepository.upload(article.imageBinary, 'thumbnails')
    }
    const articleCreated = await this.articleRepository.add({
      ...article,
      imageUrl
    })
    return articleCreated
  }
}

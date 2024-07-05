import { DeleteCourse } from '@/usecases/boundaries/inputs/course/delete-course'
import { DeleteCourseRepository } from '@/usecases/boundaries/outputs/database/course/delete-course-repository'
import { LoadCourseByIdRepository } from '@/usecases/boundaries/outputs/database/course/load-course-by-id-repository'

export class DbDeleteCourse implements DeleteCourse {
  constructor (
    private readonly articleRepository: LoadCourseByIdRepository & DeleteCourseRepository
  ) { }

  async delete (userId: string, courseId: string): Promise<boolean> {
    const article = await this.articleRepository.loadById({ courseId })
    if (article[0]?.userId.toString() === userId) {
      await this.articleRepository.delete(courseId)
      return true
    }
    return false
  }
}

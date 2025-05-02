import { CourseViewModel, LoadCourseById, LoadCourseByIdParams } from '@/usecases/boundaries/inputs/course/load-course-by-id'
import { LoadCourseByIdRepository } from '@/usecases/boundaries/outputs/database/course/load-course-by-id-repository'

export class DbLoadCourseById implements LoadCourseById {
  constructor(private readonly loadCourseByIdRepository: LoadCourseByIdRepository) {}

  async loadById(params: LoadCourseByIdParams): Promise<CourseViewModel> {
    const article = await this.loadCourseByIdRepository.loadById(params)
    return article
  }
}

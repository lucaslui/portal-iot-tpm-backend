import { LoadCourses, LoadCoursesQueryModel, LoadCoursesResponseModel } from '@/usecases/boundaries/inputs/course/load-courses'
import { LoadCoursesRepository } from '@/usecases/boundaries/outputs/database/course/load-courses-repository'

export class DbLoadCourses implements LoadCourses {
  constructor (
    private readonly loadCoursesRepository: LoadCoursesRepository
  ) { }

  async load (query?: LoadCoursesQueryModel): Promise<LoadCoursesResponseModel> {
    const articles = await this.loadCoursesRepository.load(query)
    return articles
  }
}

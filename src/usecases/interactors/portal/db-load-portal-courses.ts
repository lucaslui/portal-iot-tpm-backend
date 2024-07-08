import { LoadCoursesQueryModel, LoadCoursesResponseModel } from '@/usecases/boundaries/inputs/course/load-courses'
import { LoadPortalCourses } from '@/usecases/boundaries/inputs/portal/load-portal-courses'
import { LoadPortalCoursesRepository } from '@/usecases/boundaries/outputs/database/portal/load-portal-courses-repository'

export class DbLoadPortalCourses implements LoadPortalCourses {
  constructor (
    private readonly loadPortalCoursesRepository: LoadPortalCoursesRepository
  ) { }

  async load (query?: LoadCoursesQueryModel): Promise<LoadCoursesResponseModel> {
    const articles = await this.loadPortalCoursesRepository.loadCourses(query)
    return articles
  }
}

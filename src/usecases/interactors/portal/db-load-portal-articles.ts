import { LoadArticlesQueryModel } from '@/usecases/boundaries/inputs/article/load-articles'
import { LoadPortalArticles, LoadPortalArticlesResponseModel } from '@/usecases/boundaries/inputs/portal/load-portal-articles'
import { LoadPortalArticlesRepository } from '@/usecases/boundaries/outputs/database/portal/load-portal-articles-repository'

export class DbLoadPortalArticles implements LoadPortalArticles {
  constructor (
    private readonly loadPortalArticlesRepository: LoadPortalArticlesRepository
  ) { }

  async load (query?: LoadArticlesQueryModel): Promise<LoadPortalArticlesResponseModel> {
    const queryWithState = { ...query, state: 'published' }
    const articles = await this.loadPortalArticlesRepository.loadArticles(queryWithState)
    return articles
  }
}

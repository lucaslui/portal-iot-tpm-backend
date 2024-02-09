import { LoadArticlesRepository } from '@/usecases/boundaries/outputs/database/article/load-articles-repository'
import { LoadArticles, LoadArticlesQueryModel, LoadArticlesResponseModel } from '@/usecases/boundaries/inputs/article/load-articles'

export class DbLoadArticles implements LoadArticles {
  constructor (
    private readonly loadArticlesRepository: LoadArticlesRepository
  ) { }

  async load (query?: LoadArticlesQueryModel): Promise<LoadArticlesResponseModel> {
    const articles = await this.loadArticlesRepository.load(query)
    return articles
  }
}

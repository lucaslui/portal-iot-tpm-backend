import { LoadArticlesRepository } from '@/data/protocols/database/article/load-articles-repository'
import { LoadArticles, LoadArticlesQueryModel, LoadArticlesResponseModel } from '@/domain/usecases/article/load-articles'

export class DbLoadArticles implements LoadArticles {
  constructor (
    private readonly loadArticlesRepository: LoadArticlesRepository
  ) { }

  async load (query?: LoadArticlesQueryModel): Promise<LoadArticlesResponseModel> {
    const articles = await this.loadArticlesRepository.load(query)
    return articles
  }
}

import { LoadArticlesRepository } from '@/data/protocols/database/article/load-articles-repository'
import { ArticleModel } from '@/domain/entities/article'
import { LoadArticles, LoadArticlesQueryModel } from '@/domain/usecases/article/load-articles'

export class DbLoadArticles implements LoadArticles {
  constructor (
    private readonly loadArticlesRepository: LoadArticlesRepository
  ) { }

  async load (query?: LoadArticlesQueryModel): Promise<ArticleModel[]> {
    const articles = await this.loadArticlesRepository.load(query)
    return articles
  }
}

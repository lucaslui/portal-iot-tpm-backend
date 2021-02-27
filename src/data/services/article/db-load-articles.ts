import { LoadArticlesRepository } from '@/data/protocols/database/article/load-articles'
import { ArticleModel } from '@/domain/entities/article'
import { LoadArticles } from '@/domain/usecases/article/load-articles'

export class DbLoadArticles implements LoadArticles {
  constructor (
    private readonly loadArticlesRepository: LoadArticlesRepository
  ) { }

  async load (page?: number): Promise<ArticleModel[]> {
    const articles = await this.loadArticlesRepository.load(page)
    return articles
  }
}

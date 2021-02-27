import { LoadArticlesByUserRepository } from '@/data/protocols/database/article/load-articles-by-user'
import { ArticleModel } from '@/domain/entities/article'
import { LoadArticlesByUser } from '@/domain/usecases/article/load-articles-by-user'

export class DbLoadArticlesByUser implements LoadArticlesByUser {
  constructor (
    private readonly loadArticlesByUserRepository: LoadArticlesByUserRepository
  ) { }

  async loadByUser (userId: string, page?: number): Promise<ArticleModel[]> {
    const articles = await this.loadArticlesByUserRepository.loadByUser(userId, page)
    return articles
  }
}

import { LoadArticlesByCategoryRepository } from '@/data/protocols/database/article/load-articles-by-category'
import { ArticleModel } from '@/domain/entities/article'
import { LoadArticlesByCategory } from '@/domain/usecases/article/load-articles-by-category'

export class DbLoadArticlesByCategory implements LoadArticlesByCategory {
  constructor (
    private readonly loadArticlesByCategoryRepository: LoadArticlesByCategoryRepository
  ) { }

  async loadByCategory (categoryId: string, page?: number): Promise<ArticleModel[]> {
    const articles = await this.loadArticlesByCategoryRepository.loadByCategory(categoryId, page)
    return articles
  }
}

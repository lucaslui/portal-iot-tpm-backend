import { LoadArticleByIdRepository } from '@/data/protocols/database/article/load-article-by-id-repository'
import { ArticleModel } from '@/domain/entities/article'
import { LoadArticleById } from '@/domain/usecases/article/load-article-by-id'

export class DbLoadArticleById implements LoadArticleById {
  constructor (
    private readonly loadArticleByIdRepository: LoadArticleByIdRepository
  ) { }

  async loadById (articleId: string): Promise<ArticleModel> {
    const article = await this.loadArticleByIdRepository.loadById(articleId)
    return article
  }
}

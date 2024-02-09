import { LoadArticleByIdRepository } from '@/data/protocols/database/article/load-article-by-id-repository'
import { LoadArticleById, LoadArticleByIdParams } from '@/domain/usecases/article/load-article-by-id'
import { ArticleViewModel } from '@/domain/usecases/article/load-articles'

export class DbLoadArticleById implements LoadArticleById {
  constructor (
    private readonly loadArticleByIdRepository: LoadArticleByIdRepository
  ) {}

  async loadById (params: LoadArticleByIdParams): Promise<ArticleViewModel> {
    const article = await this.loadArticleByIdRepository.loadById(params)
    return article
  }
}

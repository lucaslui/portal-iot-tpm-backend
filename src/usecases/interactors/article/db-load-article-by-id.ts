import { LoadArticleByIdRepository } from '@/usecases/boundaries/outputs/database/article/load-article-by-id-repository'
import { LoadArticleById, LoadArticleByIdParams } from '@/usecases/boundaries/inputs/article/load-article-by-id'
import { ArticleViewModel } from '@/usecases/boundaries/inputs/article/load-articles'

export class DbLoadArticleById implements LoadArticleById {
  constructor (
    private readonly loadArticleByIdRepository: LoadArticleByIdRepository
  ) {}

  async loadById (params: LoadArticleByIdParams): Promise<ArticleViewModel> {
    const article = await this.loadArticleByIdRepository.loadById(params)
    return article
  }
}

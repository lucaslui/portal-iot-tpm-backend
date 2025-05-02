import { LoadArticleByIdRepository } from '@/usecases/boundaries/outputs/database/article/load-article-by-id-repository'
import { ArticleViewModel, LoadArticleById, LoadArticleByIdParams } from '@/usecases/boundaries/inputs/article/load-article-by-id'

export class DbLoadArticleById implements LoadArticleById {
  constructor(private readonly loadArticleByIdRepository: LoadArticleByIdRepository) {}

  async loadById(params: LoadArticleByIdParams): Promise<ArticleViewModel> {
    const article = await this.loadArticleByIdRepository.loadById(params)
    return article
  }
}

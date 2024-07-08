import { ArticleViewModel, LoadArticleByIdParams } from '@/usecases/boundaries/inputs/article/load-article-by-id'
import { LoadPortalArticleById } from '@/usecases/boundaries/inputs/portal/load-portal-article-by-id'
import { LoadPortalArticleByIdRepository } from '@/usecases/boundaries/outputs/database/portal/load-portal-article-by-id-repository'

export class DbLoadPortalArticleById implements LoadPortalArticleById {
  constructor (
    private readonly loadPortalArticleByIdRepository: LoadPortalArticleByIdRepository
  ) {}

  async loadArticleById (params: LoadArticleByIdParams): Promise<ArticleViewModel> {
    const article = await this.loadPortalArticleByIdRepository.loadArticlesById(params)
    return article
  }
}

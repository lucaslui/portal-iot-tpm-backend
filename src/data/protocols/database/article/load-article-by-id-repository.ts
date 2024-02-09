import { ArticleViewModel, LoadArticleByIdParams } from '@/domain/usecases/article/load-article-by-id'

export interface LoadArticleByIdRepository {
  loadById: (params: LoadArticleByIdParams) => Promise<ArticleViewModel>
}

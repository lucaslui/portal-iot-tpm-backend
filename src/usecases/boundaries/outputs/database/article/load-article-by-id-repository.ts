import { ArticleViewModel, LoadArticleByIdParams } from '@/usecases/boundaries/inputs/article/load-article-by-id'

export interface LoadArticleByIdRepository {
  loadById: (params: LoadArticleByIdParams) => Promise<ArticleViewModel>
}

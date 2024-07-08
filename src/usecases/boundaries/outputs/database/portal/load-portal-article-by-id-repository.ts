import { ArticleViewModel, LoadArticleByIdParams } from '@/usecases/boundaries/inputs/article/load-article-by-id'

export interface LoadPortalArticleByIdRepository {
  loadArticlesById: (params: LoadArticleByIdParams) => Promise<ArticleViewModel>
}

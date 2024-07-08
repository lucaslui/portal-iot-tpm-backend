import { LoadArticlesQueryModel, LoadArticlesResponseModel } from '@/usecases/boundaries/inputs/article/load-articles'

export interface LoadPortalArticlesRepository {
  loadArticles: (query?: LoadArticlesQueryModel) => Promise<LoadArticlesResponseModel>
}

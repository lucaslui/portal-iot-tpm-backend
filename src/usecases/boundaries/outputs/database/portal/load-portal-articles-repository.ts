import { LoadArticlesQueryModel } from '@/usecases/boundaries/inputs/article/load-articles'
import { LoadPortalArticlesResponseModel } from '@/usecases/boundaries/inputs/portal/load-portal-articles'

export interface LoadPortalArticlesRepository {
  loadArticles: (query?: LoadArticlesQueryModel) => Promise<LoadPortalArticlesResponseModel>
}

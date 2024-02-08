import { LoadArticlesQueryModel, LoadArticlesResponseModel } from '@/domain/usecases/article/load-articles'

export interface LoadArticlesRepository {
  load: (query?: LoadArticlesQueryModel) => Promise<LoadArticlesResponseModel>
}

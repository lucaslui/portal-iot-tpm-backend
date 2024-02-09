import { LoadArticlesQueryModel, LoadArticlesResponseModel } from '@/usecases/boundaries/inputs/article/load-articles'

export interface LoadArticlesRepository {
  load: (query?: LoadArticlesQueryModel) => Promise<LoadArticlesResponseModel>
}

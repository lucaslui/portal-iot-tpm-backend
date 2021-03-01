import { ArticleModel } from '@/domain/entities/article'
import { LoadArticlesQueryModel } from '@/domain/usecases/article/load-articles'

export interface LoadArticlesRepository {
  load: (query?: LoadArticlesQueryModel) => Promise<ArticleModel[]>
}

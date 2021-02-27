import { ArticleModel } from '@/domain/entities/article'

export interface LoadArticlesRepository {
  load: (page?: number) => Promise<ArticleModel[]>
}

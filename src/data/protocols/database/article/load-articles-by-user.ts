import { ArticleModel } from '@/domain/entities/article'

export interface LoadArticlesByUserRepository {
  loadByUser: (userId: string, page?: number) => Promise<ArticleModel[]>
}

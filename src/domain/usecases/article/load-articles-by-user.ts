import { ArticleModel } from '@/domain/entities/article'

export interface LoadArticlesByUser {
  loadByUser: (userId: string, page?: number) => Promise<ArticleModel[]>
}

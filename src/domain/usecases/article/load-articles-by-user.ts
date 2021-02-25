import { ArticleModel } from '@/domain/entities/article';

export interface LoadArticlesByUser {
  loadArticlesByUser: (userId: string, page?: number) => Promise<ArticleModel[]>
}

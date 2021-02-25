import { ArticleModel } from '@/domain/entities/article';

export interface LoadArticlesByUser {
  loadArticlesByUser: (page?: number) => Promise<ArticleModel[]>
}

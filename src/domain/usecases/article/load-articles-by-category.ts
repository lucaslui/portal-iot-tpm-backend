import { ArticleModel } from '@/domain/entities/article'

export interface LoadArticlesByCategory {
  loadByCategory: (categoryId: string, page?: number) => Promise<ArticleModel[]>
}

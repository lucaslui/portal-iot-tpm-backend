import { ArticleModel } from '@/domain/entities/article'

export interface LoadArticlesByCategoryRepository {
  loadByCategory: (categoryId: string, page?: number) => Promise<ArticleModel[]>
}

import { ArticleModel } from '@/domain/entities/article'

export interface LoadArticleByCategory {
  loadArticlesByCategory: (categoryId: string) => Promise<ArticleModel[]>
}

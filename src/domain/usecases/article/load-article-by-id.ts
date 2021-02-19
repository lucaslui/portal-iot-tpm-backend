import { ArticleModel } from '@/domain/entities/article'

export interface LoadArticleById {
  loadById: (articleId: string) => Promise<ArticleModel>
}

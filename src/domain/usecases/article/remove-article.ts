import { ArticleModel } from '@/domain/entities/article'

export interface RemoveArticleById {
  removeById: (articleId: string) => Promise<ArticleModel>
}

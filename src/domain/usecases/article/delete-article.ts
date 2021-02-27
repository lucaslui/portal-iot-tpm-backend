import { ArticleModel } from '@/domain/entities/article'

export interface DeleteArticle {
  delete: (userId: string, articleId: string) => Promise<ArticleModel>
}

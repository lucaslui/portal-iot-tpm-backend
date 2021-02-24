import { ArticleModel } from '@/domain/entities/article'

export interface DeleteArticle {
  delete: (articleId: string) => Promise<ArticleModel>
}

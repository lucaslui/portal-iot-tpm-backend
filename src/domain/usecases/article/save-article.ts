import { ArticleModel } from '@/domain/entities/article'

export interface SaveArticle {
  save: (article: ArticleModel) => Promise<ArticleModel>
}

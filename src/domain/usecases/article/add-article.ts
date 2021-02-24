import { ArticleModel } from '@/domain/entities/article'

export interface AddArticle {
  add: (article: ArticleModel) => Promise<ArticleModel>
}

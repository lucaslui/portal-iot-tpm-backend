import { ArticleModel } from '@/domain/entities/article'

export interface EditArticle {
  edit: (article: ArticleModel) => Promise<ArticleModel>
}

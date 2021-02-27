import { ArticleModel } from '@/domain/entities/article'

export interface EditArticle {
  edit: (userId: string, article: EditArticleModel) => Promise<ArticleModel>
}

export interface EditArticleModel {
  title: string
  description: string
  content: BinaryType
  imageUrl?: string
  categoryId: string
}

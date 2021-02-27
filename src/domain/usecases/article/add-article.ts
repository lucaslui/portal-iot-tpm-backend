import { ArticleModel } from '@/domain/entities/article'

export interface AddArticle {
  add: (article: AddArticleModel) => Promise<ArticleModel>
}

export interface AddArticleModel {
  title: string
  description: string
  content: BinaryType
  imageUrl?: string
  userId: string
  categoryId: string
  createdAt: Date
}

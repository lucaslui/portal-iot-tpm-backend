import { ArticleModel, ArticleType } from '@/domain/entities/article'

export type AddArticleRepositoryModel = {
  title: string
  description: string
  type: ArticleType
  content: BinaryType
  imageUrl?: string
  userId: string
  categoryIds: string[]
}

export interface AddArticleRepository {
  add (article: AddArticleRepositoryModel): Promise<ArticleModel>
}

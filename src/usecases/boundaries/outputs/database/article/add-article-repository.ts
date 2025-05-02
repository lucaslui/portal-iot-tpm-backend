import { ArticleModel } from '@/domain/entities/article'

export type AddArticleRepositoryModel = Omit<ArticleModel, 'id' | 'updatedAt' | 'createdAt'>

export interface AddArticleRepository {
  add(article: AddArticleRepositoryModel): Promise<ArticleModel>
}

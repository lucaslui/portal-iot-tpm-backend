import { ArticleModel } from '@/domain/entities/article'

export type EditArticleRepositoryModel = Omit<ArticleModel, 'id' | 'userId' | 'updatedAt' | 'createdAt' >

export interface EditArticleRepository {
  edit: (articleId: string, newArticle: EditArticleRepositoryModel) => Promise<void>
}

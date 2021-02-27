import { ArticleModel } from '@/domain/entities/article'

export interface LoadArticleByIdRepository {
  loadById: (articleId: string) => Promise<ArticleModel>
}

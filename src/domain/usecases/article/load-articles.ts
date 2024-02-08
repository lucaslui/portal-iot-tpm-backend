import { ArticleModel } from '@/domain/entities/article'

export interface LoadArticles {
  load: (query?: LoadArticlesQueryModel) => Promise<ArticleModel[]>
}

export type LoadArticlesQueryModel = {
  page?: number
  articleId?: string
  userId?: string
  categoryIds?: string[]
  month?: number
  year?: number
}

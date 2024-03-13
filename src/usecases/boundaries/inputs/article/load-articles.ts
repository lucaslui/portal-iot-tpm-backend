import { ArticleViewModel } from '@/usecases/boundaries/inputs/article/load-article-by-id'

export type LoadArticlesQueryModel = {
  page?: number
  limit?: number
  type?: string
  state?: string
  userId?: string
  search?: string
  categoryIds?: string[]
  month?: number
  year?: number
}

export type LoadArticlesResponseModel = {
  articles: Array<Omit<ArticleViewModel, 'content'>>
  count: number
  page: number
  totalPages: number
  totalItems: number
}

export interface LoadArticles {
  load: (query?: LoadArticlesQueryModel) => Promise<LoadArticlesResponseModel>
}

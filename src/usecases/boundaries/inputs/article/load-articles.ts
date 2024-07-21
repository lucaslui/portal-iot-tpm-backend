import { ArticleViewModel } from '@/usecases/boundaries/inputs/article/load-article-by-id'
import { PaginationModel } from '@/usecases/shared/pagination'

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

export type LoadArticlesResponseModel = PaginationModel<Omit<ArticleViewModel, 'content'>>

export interface LoadArticles {
  load: (query?: LoadArticlesQueryModel) => Promise<LoadArticlesResponseModel>
}

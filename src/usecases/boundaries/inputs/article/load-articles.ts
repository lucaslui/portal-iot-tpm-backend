export type LoadArticlesQueryModel = {
  page?: number
  limit?: number
  type?: string
  userId?: string
  categoryIds?: string[]
  month?: number
  year?: number
}

export type ArticleViewModel = {
  id: string
  title: string
  description: string
  content: string
  imageUrl: string
  user: {
    id: string
    name: string
    email: string
  }
  categories: {
    id: string
    name: string
    description: string
  }
  type: string
  createdAt: Date
  updatedAt: Date
}

export type LoadArticlesResponseModel = {
  articles: ArticleViewModel[]
  count: number
  page: number
  totalPages: number
  totalItems: number
}

export interface LoadArticles {
  load: (query?: LoadArticlesQueryModel) => Promise<LoadArticlesResponseModel>
}

export type LoadArticleByIdParams = {
  articleId: string
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

export interface LoadArticleById {
  loadById: (params: LoadArticleByIdParams) => Promise<ArticleViewModel>
}

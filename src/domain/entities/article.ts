export type ArticleType = 'concepts' | 'news' | 'tutorials' | 'projects'

export type ArticleState = 'draft' | 'published' | 'deleted'

export type ArticleModel = {
  id: string
  title: string
  description: string
  type: ArticleType
  state: ArticleState
  readTime: number
  content: string
  imageUrl?: string
  userId: string
  categoryIds: string[]
  updatedAt: Date
  createdAt: Date
}

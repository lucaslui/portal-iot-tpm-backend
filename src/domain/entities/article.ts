export type ArticleType = 'concepts' | 'news' | 'tutorials' | 'projects'

export interface ArticleModel {
  id: string
  title: string
  description: string
  type: ArticleType
  content: BinaryType
  imageUrl?: string
  userId: string
  categoryIds: string
  updatedAt: Date
  createdAt: Date
}

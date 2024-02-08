export interface ArticleModel {
  id: string
  title: string
  description: string
  type: 'article' | 'new' | 'tutorial' | 'project'
  content: BinaryType
  imageUrl?: string
  userId: string
  categoryIds: string
  updatedAt: Date
  createdAt: Date
}

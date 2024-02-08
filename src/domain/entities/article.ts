export interface ArticleModel {
  id: string
  title: string
  description: string
  content: BinaryType
  imageUrl?: string
  userId: string
  categoryIds: string
  updatedAt: Date
  createdAt: Date
}

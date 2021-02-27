export interface ArticleModel {
  id: string
  title: string
  description: string
  content: BinaryType
  imageUrl?: string
  userId: string
  categoryId: string
  createdAt: Date
}

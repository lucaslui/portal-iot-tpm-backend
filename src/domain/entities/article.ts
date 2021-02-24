export interface ArticleModel {
  id: string
  title: string
  description: string
  content: BinaryType
  imageUrl?: string
  createdAt?: Date
  userId: string
  categoryId: string
}

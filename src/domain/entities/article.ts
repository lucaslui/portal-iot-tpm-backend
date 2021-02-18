export interface Article {
  id: string
  name: string
  description: string
  imageUrl?: string
  content: BinaryType
  userId: string
  categoryId: string
}

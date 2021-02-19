export interface ArticleModel {
  id: string
  name: string
  description: string
  imageUrl?: string
  content: BinaryType
  categoryId: string
}

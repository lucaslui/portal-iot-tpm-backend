export interface EditArticle {
  edit: (userId: string, article: EditArticleModel) => Promise<boolean>
}

export interface EditArticleModel {
  title: string
  description: string
  content: BinaryType
  imageUrl?: string
  categoryId: string
}

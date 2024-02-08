export interface EditArticle {
  edit: (userId: string, articleId: string, newArticle: EditArticleModel) => Promise<boolean>
}

export interface EditArticleModel {
  title: string
  description: string
  content: BinaryType
  imageUrl?: string
  categoryIds: string[]
}

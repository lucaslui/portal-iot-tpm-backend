export type EditArticleModel = {
  title: string
  description: string
  type: string
  content: BinaryType
  imageUrl?: string
  categoryIds: string[]
  imageBinary?: {
    fieldname: string
    originalname: string
    encoding: string
    mimetype: string
    buffer: Buffer
    size: number
  }
}

export interface EditArticle {
  edit: (userId: string, articleId: string, newArticle: EditArticleModel) => Promise<boolean>
}

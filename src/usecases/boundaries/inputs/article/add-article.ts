import { ArticleModel } from '@/domain/entities/article'

export interface AddArticle {
  add: (article: AddArticleModel) => Promise<ArticleModel>
}

export interface AddArticleModel {
  title: string
  description: string
  content: BinaryType
  imageBinary?: {
    fieldname: string
    originalname: string
    encoding: string
    mimetype: string
    buffer: Buffer
    size: number
  }
  userId: string
  categoryIds: string[]
}

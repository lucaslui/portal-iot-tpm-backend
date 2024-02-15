import { ArticleModel, ArticleType } from '@/domain/entities/article'

export interface AddArticle {
  add: (article: AddArticleModel) => Promise<ArticleModel>
}

export interface AddArticleModel {
  title: string
  description: string
  type: ArticleType
  content: BinaryType
  userId: string
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

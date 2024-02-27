import { ArticleModel } from '@/domain/entities/article'

export type AddArticleModel = Omit<ArticleModel, 'id' | 'imageUrl' | 'updatedAt' | 'createdAt'> & {
  imageBinary?: {
    fieldname: string
    originalname: string
    encoding: string
    mimetype: string
    buffer: Buffer
    size: number
  }
}

export interface AddArticle {
  add: (article: AddArticleModel) => Promise<ArticleModel>
}

import { ArticleModel } from '@/domain/entities/article'

export type EditArticleModel = Omit<ArticleModel, 'id' | 'userId' | 'imageUrl' | 'updatedAt' | 'createdAt'> & {
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
  edit: (articleId: string, newArticle: EditArticleModel, userId: string) => Promise<boolean>
}

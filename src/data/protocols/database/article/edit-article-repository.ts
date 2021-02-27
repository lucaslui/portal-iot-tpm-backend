import { EditArticleModel } from '@/domain/usecases/article/edit-article'

export interface EditArticleRepository {
  edit: (articleId: string, newArticle: EditArticleModel) => Promise<void>
}

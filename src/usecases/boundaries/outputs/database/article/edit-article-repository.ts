import { EditArticleModel } from '@/usecases/boundaries/inputs/article/edit-article'

export interface EditArticleRepository {
  edit: (articleId: string, newArticle: EditArticleModel) => Promise<void>
}

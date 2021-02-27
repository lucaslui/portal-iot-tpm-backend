import { ArticleModel } from '@/domain/entities/article'
import { AddArticleModel } from '@/domain/usecases/article/add-article'

export interface AddArticleRepository {
  add (article: AddArticleModel): Promise<ArticleModel>
}

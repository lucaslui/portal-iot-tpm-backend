import { EditArticleRepository } from '@/usecases/boundaries/outputs/database/article/edit-article-repository'
import { LoadArticlesRepository } from '@/usecases/boundaries/outputs/database/article/load-articles-repository'
import { EditArticle, EditArticleModel } from '@/usecases/boundaries/inputs/article/edit-article'

export class DbEditArticle implements EditArticle {
  constructor (
    private readonly loadArticlesRepository: LoadArticlesRepository,
    private readonly editArticleRepository: EditArticleRepository
  ) { }

  async edit (userId: string, articleId: string, newArticle: EditArticleModel): Promise<boolean> {
    const article = await this.loadArticlesRepository.load({ articleId })
    if (article[0].userId.toString() === userId) {
      await this.editArticleRepository.edit(articleId, newArticle)
      return true
    }
    return false
  }
}

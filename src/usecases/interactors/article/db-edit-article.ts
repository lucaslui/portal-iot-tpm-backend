import { EditArticleRepository } from '@/usecases/boundaries/outputs/database/article/edit-article-repository'
import { EditArticle, EditArticleModel } from '@/usecases/boundaries/inputs/article/edit-article'
import { LoadArticleByIdRepository } from '@/usecases/boundaries/outputs/database/article/load-article-by-id-repository'

export class DbEditArticle implements EditArticle {
  constructor (
    private readonly articleRepository: LoadArticleByIdRepository & EditArticleRepository
  ) { }

  async edit (userId: string, articleId: string, newArticle: EditArticleModel): Promise<boolean> {
    const article = await this.articleRepository.loadById({ articleId })
    if (article[0].userId.toString() === userId) {
      await this.articleRepository.edit(articleId, newArticle)
      return true
    }
    return false
  }
}

import { EditArticleRepository } from '@/data/protocols/database/article/edit-article-repository'
import { LoadArticleByIdRepository } from '@/data/protocols/database/article/load-article-by-id-repository'
import { EditArticle, EditArticleModel } from '@/domain/usecases/article/edit-article'

export class DbEditArticle implements EditArticle {
  constructor (
    private readonly loadArticleByIdRepository: LoadArticleByIdRepository,
    private readonly editArticleRepository: EditArticleRepository
  ) { }

  async edit (userId: string, articleId: string, newArticle: EditArticleModel): Promise<boolean> {
    const article = await this.loadArticleByIdRepository.loadById(articleId)
    if (article?.userId === userId) {
      await this.editArticleRepository.edit(articleId, newArticle)
      return true
    }
    return false
  }
}

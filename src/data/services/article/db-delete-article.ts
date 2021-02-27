import { DeleteArticleRepository } from '@/data/protocols/database/article/delete-article-repository'
import { LoadArticleByIdRepository } from '@/data/protocols/database/article/load-article-by-id-repository'
import { DeleteArticle } from '@/domain/usecases/article/delete-article'

export class DbDeleteArticle implements DeleteArticle {
  constructor (
    private readonly loadArticleByIdRepository: LoadArticleByIdRepository,
    private readonly deleteArticleRepository: DeleteArticleRepository
  ) { }

  async delete (userId: string, articleId: string): Promise<boolean> {
    const article = await this.loadArticleByIdRepository.loadById(articleId)
    if (article?.userId === userId) {
      await this.deleteArticleRepository.delete(articleId)
      return true
    }
    return false
  }
}

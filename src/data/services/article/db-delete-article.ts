import { DeleteArticleRepository } from '@/data/protocols/database/article/delete-article-repository'
import { LoadArticlesRepository } from '@/data/protocols/database/article/load-articles-repository'
import { DeleteArticle } from '@/domain/usecases/article/delete-article'

export class DbDeleteArticle implements DeleteArticle {
  constructor (
    private readonly loadArticlesRepository: LoadArticlesRepository,
    private readonly deleteArticleRepository: DeleteArticleRepository
  ) { }

  async delete (userId: string, articleId: string): Promise<boolean> {
    const article = await this.loadArticlesRepository.load({ articleId })
    if (article[0]?.userId.toString() === userId) {
      await this.deleteArticleRepository.delete(articleId)
      return true
    }
    return false
  }
}

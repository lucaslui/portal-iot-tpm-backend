import { DeleteArticleRepository } from '@/usecases/boundaries/outputs/database/article/delete-article-repository'
import { DeleteArticle } from '@/usecases/boundaries/inputs/article/delete-article'
import { LoadArticleByIdRepository } from '@/usecases/boundaries/outputs/database/article/load-article-by-id-repository'

export class DbDeleteArticle implements DeleteArticle {
  constructor (
    private readonly articleRepository: LoadArticleByIdRepository & DeleteArticleRepository
  ) { }

  async delete (userId: string, articleId: string): Promise<boolean> {
    const article = await this.articleRepository.loadById({ articleId })
    if (article[0]?.userId.toString() === userId) {
      await this.articleRepository.delete(articleId)
      return true
    }
    return false
  }
}

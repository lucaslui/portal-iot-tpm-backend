import { AddArticleRepository } from '@/data/protocols/database/article/add-article-repository'
import { ArticleModel } from '@/domain/entities/article'
import { AddArticle, AddArticleModel } from '@/domain/usecases/article/add-article'

export class DbAddArticle implements AddArticle {
  constructor (
    private readonly addArticleRepository: AddArticleRepository
  ) { }

  async add (article: AddArticleModel): Promise<ArticleModel> {
    const articleCreated = await this.addArticleRepository.add(article)
    if (articleCreated) {
      return articleCreated
    }
    return null
  }
}

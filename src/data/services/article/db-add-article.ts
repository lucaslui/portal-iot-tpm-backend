import { AddArticleRepository } from '@/data/protocols/database/article/add-article-repository'
import { ImageStorage } from '@/data/protocols/storage/image-storage'
import { ArticleModel } from '@/domain/entities/article'
import { AddArticle, AddArticleModel } from '@/domain/usecases/article/add-article'

export class DbAddArticle implements AddArticle {
  constructor (
    private readonly articleRepository: AddArticleRepository,
    private readonly imageRepository: ImageStorage
  ) { }

  async add (article: AddArticleModel): Promise<ArticleModel> {
    let imageUrl = ''
    if (article.imageBinary) {
      imageUrl = await this.imageRepository.upload(article.imageBinary)
    }
    const articleCreated = await this.articleRepository.add({
      ...article,
      imageUrl
    })
    return articleCreated
  }
}

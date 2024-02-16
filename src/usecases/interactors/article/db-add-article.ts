import { AddArticleRepository } from '@/usecases/boundaries/outputs/database/article/add-article-repository'
import { UploadImageStorage } from '@/usecases/boundaries/outputs/storage/upload-image-storage'
import { ArticleModel } from '@/domain/entities/article'
import { AddArticle, AddArticleModel } from '@/usecases/boundaries/inputs/article/add-article'

export class DbAddArticle implements AddArticle {
  constructor (
    private readonly articleRepository: AddArticleRepository,
    private readonly imageRepository: UploadImageStorage
  ) { }

  async add (article: AddArticleModel): Promise<ArticleModel> {
    let imageUrl = ''
    if (article.imageBinary) {
      imageUrl = await this.imageRepository.upload(article.imageBinary, 'thumbnails')
    }
    const articleCreated = await this.articleRepository.add({
      ...article,
      imageUrl
    })
    return articleCreated
  }
}

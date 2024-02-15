import { EditArticleRepository } from '@/usecases/boundaries/outputs/database/article/edit-article-repository'
import { EditArticle, EditArticleModel } from '@/usecases/boundaries/inputs/article/edit-article'
import { LoadArticleByIdRepository } from '@/usecases/boundaries/outputs/database/article/load-article-by-id-repository'
import { ImageStorage } from '@/usecases/boundaries/outputs/storage/image-storage'

export class DbEditArticle implements EditArticle {
  constructor (
    private readonly articleRepository: LoadArticleByIdRepository & EditArticleRepository,
    private readonly imageRepository: ImageStorage
  ) { }

  async edit (userId: string, articleId: string, newArticle: EditArticleModel): Promise<boolean> {
    const article = await this.articleRepository.loadById({ articleId })
    if (article.user.id.toString() === userId.toString()) {
      let imageUrl = ''
      if (newArticle.imageBinary) {
        imageUrl = await this.imageRepository.upload(newArticle.imageBinary, 'thumbnails')
      }
      const { imageBinary, ...newArticleWithoutImageBinary } = { ...newArticle, imageUrl }
      await this.articleRepository.edit(articleId, newArticleWithoutImageBinary)
      return true
    }
    return false
  }
}

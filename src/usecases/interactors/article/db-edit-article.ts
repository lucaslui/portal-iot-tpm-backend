import { EditArticleRepository, EditArticleRepositoryModel } from '@/usecases/boundaries/outputs/database/article/edit-article-repository'
import { EditArticle, EditArticleModel } from '@/usecases/boundaries/inputs/article/edit-article'
import { LoadArticleByIdRepository } from '@/usecases/boundaries/outputs/database/article/load-article-by-id-repository'
import { UploadImageStorage } from '@/usecases/boundaries/outputs/storage/upload-image-storage'
import { DeleteImageStorage } from '@/usecases/boundaries/outputs/storage/delete-image-storage'

export class DbEditArticle implements EditArticle {
  constructor (
    private readonly articleRepository: LoadArticleByIdRepository & EditArticleRepository,
    private readonly imageRepository: UploadImageStorage & DeleteImageStorage
  ) { }

  async edit (articleId: string, newArticle: EditArticleModel, userId: string): Promise<boolean> {
    const oldArticle = await this.articleRepository.loadById({ articleId })
    let newArticleRepositoryModel: EditArticleRepositoryModel = { ...newArticle }
    if (oldArticle.user.id.toString() === userId.toString()) {
      if (newArticle.imageBinary) {
        const imageUrl = await this.imageRepository.upload(newArticle.imageBinary, 'thumbnails')
        if (oldArticle.imageUrl) {
          const fileId = oldArticle.imageUrl.split('/').pop()
          await this.imageRepository.delete(fileId)
        }
        newArticleRepositoryModel = { ...newArticleRepositoryModel, imageUrl }
      }
      await this.articleRepository.edit(articleId, newArticleRepositoryModel)
      return true
    }
    return false
  }
}

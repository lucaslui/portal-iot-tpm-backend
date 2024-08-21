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
    let newArticleRepositoryModel: EditArticleRepositoryModel = { ...newArticle }

    const oldArticle = await this.articleRepository.loadById({ articleId })

    if (oldArticle.user.id.toString() === userId.toString()) {
      if (newArticle.imageBinary) {
        const imageUrl = await this.imageRepository.upload(newArticle.imageBinary, 'thumbnails')
        if (oldArticle.imageUrl) {
          const fileId = oldArticle.imageUrl.split('/').pop().split('.')[0]
          await this.imageRepository.delete(`thumbnails/${fileId}`)
        }
        newArticleRepositoryModel = { ...newArticleRepositoryModel, imageUrl }
      }

      const newImages = this.getAllImagesFromContent(newArticle.content)
      const oldImages = this.getAllImagesFromContent(oldArticle.content)

      const newUrlImages = this.getUrlImagesFromAllImages(newImages)
      const oldUrlImages = this.getUrlImagesFromAllImages(oldImages)

      const urlImagesToDelete = oldUrlImages.filter(oldImage => !newUrlImages.includes(oldImage))

      if (urlImagesToDelete.length > 0) {
        await Promise.all(urlImagesToDelete.map(async imageUrl => {
          const fileId = imageUrl.split('/').pop().split('.')[0]
          await this.imageRepository.delete(`contents/${fileId}`)
        }))
      }

      const binaryImages = this.getBinaryImagesFromAllImages(newImages)

      if (binaryImages.length > 0) {
        const newContent = await this.replaceBinaryToUrlImages(newArticle.content, binaryImages)
        newArticleRepositoryModel = { ...newArticleRepositoryModel, content: newContent }
      }

      await this.articleRepository.edit(articleId, newArticleRepositoryModel)

      return true
    }
    return false
  }

  private getAllImagesFromContent (content: string): string[] {
    const regex = /<img[^>]+src="([^">]+)"/g

    const images: string[] = []

    let match

    while ((match = regex.exec(content))) {
      images.push(match[1])
    }

    return images
  }

  private getBinaryImagesFromAllImages (images: string[]): string[] {
    return images.filter(image => image.startsWith('data:'))
  }

  private getUrlImagesFromAllImages (images: string[]): string[] {
    return images.filter(image => image.startsWith('https://'))
  }

  private async replaceBinaryToUrlImages (content: string, binaryImages: string[]): Promise<string> {
    const urlImages = await Promise.all(binaryImages.map(async imageBinary => {
      const imageUrl = await this.imageRepository.upload(imageBinary, 'contents')
      return imageUrl
    }))

    let newContent = content

    binaryImages.forEach((imageBinary, index) => {
      newContent = newContent.replace(`src="${imageBinary}"`, `src="${urlImages[index]}"`)
    })

    return newContent
  }
}

import { AddArticleRepository, AddArticleRepositoryModel } from '@/usecases/boundaries/outputs/database/article/add-article-repository'
import { UploadImageStorage } from '@/usecases/boundaries/outputs/storage/upload-image-storage'
import { ArticleModel } from '@/domain/entities/article'
import { AddArticle, AddArticleModel } from '@/usecases/boundaries/inputs/article/add-article'

export class DbAddArticle implements AddArticle {
  constructor (
    private readonly articleRepository: AddArticleRepository,
    private readonly imageRepository: UploadImageStorage
  ) { }

  async add (article: AddArticleModel): Promise<ArticleModel> {
    let articleToAdd: AddArticleRepositoryModel = { ...article }

    if (article.imageBinary) {
      const thumbnailUrl = await this.imageRepository.upload(article.imageBinary, 'thumbnails')
      articleToAdd = { ...articleToAdd, imageUrl: thumbnailUrl }
    }

    const contentImages = this.getAllImagesFromContent(article.content)
    const contentBinaryImages = this.getBinaryImagesFromAllImages(contentImages)

    if (contentBinaryImages.length > 0) {
      const newContent = await this.replaceBinaryToUrlImages(article.content, contentBinaryImages)
      articleToAdd = { ...articleToAdd, content: newContent }
    }

    const articleCreated = await this.articleRepository.add(articleToAdd)

    return articleCreated
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

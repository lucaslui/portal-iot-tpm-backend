import { DbEditArticle } from '@/usecases/interactors/article/db-edit-article'
import { EditArticle } from '@/usecases/boundaries/inputs/article/edit-article'
import { ArticleMongoRepository } from '@/infrastructure/database/mongodb/article-mongo-repository'
import { CloudinaryImageStorage } from '@/infrastructure/storage/cloudinary-storage'

import env from '@/configuration/config/env'

export const makeDbEditArticle = (): EditArticle => {
  const cloudinaryImageStorage = new CloudinaryImageStorage(
    env.cloudinaryCloudName,
    env.cloudinaryApiKey,
    env.cloudinaryApiSecret
  )
  const articleMongoRepository = new ArticleMongoRepository()
  return new DbEditArticle(articleMongoRepository, cloudinaryImageStorage)
}

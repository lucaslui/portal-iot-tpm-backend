import { DbAddArticle } from '@/usecases/interactors/article/db-add-article'
import { AddArticle } from '@/usecases/boundaries/inputs/article/add-article'
import { ArticleMongoRepository } from '@/infrastructure/database/mongodb/article-mongo-repository'
import { CloudinaryImageStorage } from '@/infrastructure/storage/cloudinary-storage'

import env from '@/configuration/config/env'

export const makeDbAddArticle = (): AddArticle => {
  const cloudinaryImageStorage = new CloudinaryImageStorage(env.cloudinaryCloudName, env.cloudinaryApiKey, env.cloudinaryApiSecret)
  const articleMongoRepository = new ArticleMongoRepository()
  return new DbAddArticle(articleMongoRepository, cloudinaryImageStorage)
}

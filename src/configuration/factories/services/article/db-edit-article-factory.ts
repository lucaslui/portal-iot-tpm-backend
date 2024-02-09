import { DbEditArticle } from '@/usecases/interactors/article/db-edit-article'
import { EditArticle } from '@/usecases/boundaries/inputs/article/edit-article'
import { ArticleMongoRepository } from '@/infrastructure/database/mongodb/article-mongo-repository'

export const makeDbEditArticle = (): EditArticle => {
  const articleMongoRepository = new ArticleMongoRepository()
  return new DbEditArticle(articleMongoRepository)
}

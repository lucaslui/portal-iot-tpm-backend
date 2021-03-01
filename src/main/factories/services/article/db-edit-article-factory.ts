import { DbEditArticle } from '@/data/services/article/db-edit-article'
import { EditArticle } from '@/domain/usecases/article/edit-article'
import { ArticleMongoRepository } from '@/infrastructure/database/mongodb/article-mongo-repository'

export const makeDbEditArticle = (): EditArticle => {
  const articleMongoRepository = new ArticleMongoRepository()
  return new DbEditArticle(articleMongoRepository, articleMongoRepository)
}

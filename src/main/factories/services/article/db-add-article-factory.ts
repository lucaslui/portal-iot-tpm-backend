import { DbAddArticle } from '@/data/services/article/db-add-article'
import { AddArticle } from '@/domain/usecases/article/add-article'
import { ArticleMongoRepository } from '@/infrastructure/database/mongodb/article-mongo-repository'

export const makeDbAddArticle = (): AddArticle => {
  const articleMongoRepository = new ArticleMongoRepository()
  return new DbAddArticle(articleMongoRepository)
}

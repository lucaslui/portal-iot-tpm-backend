import { DbDeleteArticle } from '@/data/services/article/db-delete-article'
import { DeleteArticle } from '@/domain/usecases/article/delete-article'
import { ArticleMongoRepository } from '@/infrastructure/database/mongodb/article-mongo-repository'

export const makeDbDeleteArticle = (): DeleteArticle => {
  const articleMongoRepository = new ArticleMongoRepository()
  return new DbDeleteArticle(articleMongoRepository, articleMongoRepository)
}

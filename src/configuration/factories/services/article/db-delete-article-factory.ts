import { DbDeleteArticle } from '@/usecases/interactors/article/db-delete-article'
import { DeleteArticle } from '@/usecases/boundaries/inputs/article/delete-article'
import { ArticleMongoRepository } from '@/infrastructure/database/mongodb/article-mongo-repository'

export const makeDbDeleteArticle = (): DeleteArticle => {
  const articleMongoRepository = new ArticleMongoRepository()
  return new DbDeleteArticle(articleMongoRepository, articleMongoRepository)
}

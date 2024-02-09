import { DbLoadArticleById } from '@/usecases/interactors/article/db-load-article-by-id'
import { LoadArticleById } from '@/usecases/boundaries/inputs/article/load-article-by-id'
import { ArticleMongoRepository } from '@/infrastructure/database/mongodb/article-mongo-repository'

export const makeDbLoadArticleById = (): LoadArticleById => {
  const articleMongoRepository = new ArticleMongoRepository()
  return new DbLoadArticleById(articleMongoRepository)
}

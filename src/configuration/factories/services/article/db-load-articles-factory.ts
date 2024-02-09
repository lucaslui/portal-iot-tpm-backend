import { DbLoadArticles } from '@/usecases/interactors/article/db-load-articles'
import { LoadArticles } from '@/usecases/boundaries/inputs/article/load-articles'
import { ArticleMongoRepository } from '@/infrastructure/database/mongodb/article-mongo-repository'

export const makeDbLoadArticles = (): LoadArticles => {
  const articleMongoRepository = new ArticleMongoRepository()
  return new DbLoadArticles(articleMongoRepository)
}

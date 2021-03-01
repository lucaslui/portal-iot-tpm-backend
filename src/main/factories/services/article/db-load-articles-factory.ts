import { DbLoadArticles } from '@/data/services/article/db-load-articles'
import { LoadArticles } from '@/domain/usecases/article/load-articles'
import { ArticleMongoRepository } from '@/infrastructure/database/mongodb/article-mongo-repository'

export const makeDbLoadArticles = (): LoadArticles => {
  const articleMongoRepository = new ArticleMongoRepository()
  return new DbLoadArticles(articleMongoRepository)
}

import { DbLoadArticleById } from '@/data/services/article/db-load-article-by-id'
import { LoadArticleById } from '@/domain/usecases/article/load-article-by-id'
import { ArticleMongoRepository } from '@/infrastructure/database/mongodb/article-mongo-repository'

export const makeDbLoadArticleById = (): LoadArticleById => {
  const articleMongoRepository = new ArticleMongoRepository()
  return new DbLoadArticleById(articleMongoRepository)
}

import { DbLoadCategories } from '@/data/services/category/db-load-categories'
import { LoadCategories } from '@/domain/usecases/category/load-categories'
import { CategoryMongoRepository } from '@/infrastructure/database/mongodb/category-mongo-repository'

export const makeDbLoadTreeCategories = (): LoadCategories => {
  const categoryMongoRepository = new CategoryMongoRepository()
  return new DbLoadCategories(categoryMongoRepository)
}

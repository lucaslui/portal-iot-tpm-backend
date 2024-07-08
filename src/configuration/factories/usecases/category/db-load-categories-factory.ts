import { DbLoadCategories } from '@/usecases/interactors/category/db-load-categories'
import { LoadCategories } from '@/usecases/boundaries/inputs/category/load-categories'
import { CategoryMongoRepository } from '@/infrastructure/database/mongodb/category-mongo-repository'

export const makeDbLoadCategories = (): LoadCategories => {
  const categoryMongoRepository = new CategoryMongoRepository()
  return new DbLoadCategories(categoryMongoRepository)
}

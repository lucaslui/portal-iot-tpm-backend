import { DbLoadCategoriesTree } from '@/data/services/category/db-load-categories-tree'
import { LoadCategoriesTree } from '@/domain/usecases/category/load-categories-tree'
import { CategoryMongoRepository } from '@/infrastructure/database/mongodb/category-mongo-repository'

export const makeDbLoadCategoriesTree = (): LoadCategoriesTree => {
  const categoryMongoRepository = new CategoryMongoRepository()
  return new DbLoadCategoriesTree(categoryMongoRepository)
}

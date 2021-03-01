import { DbDeleteCategory } from '@/data/services/category/db-delete-category'
import { DeleteCategory } from '@/domain/usecases/category/delete-category'
import { CategoryMongoRepository } from '@/infrastructure/database/mongodb/category-mongo-repository'

export const makeDbDeleteCategory = (): DeleteCategory => {
  const categoryMongoRepository = new CategoryMongoRepository()
  return new DbDeleteCategory(categoryMongoRepository, categoryMongoRepository)
}

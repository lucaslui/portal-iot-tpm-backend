import { DbDeleteCategory } from '@/usecases/interactors/category/db-delete-category'
import { DeleteCategory } from '@/usecases/boundaries/inputs/category/delete-category'
import { CategoryMongoRepository } from '@/infrastructure/database/mongodb/category-mongo-repository'

export const makeDbDeleteCategory = (): DeleteCategory => {
  const categoryMongoRepository = new CategoryMongoRepository()
  return new DbDeleteCategory(categoryMongoRepository, categoryMongoRepository)
}

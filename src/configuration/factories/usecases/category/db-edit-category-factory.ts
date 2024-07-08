import { DbEditCategory } from '@/usecases/interactors/category/db-edit-category'
import { EditCategory } from '@/usecases/boundaries/inputs/category/edit-category'
import { CategoryMongoRepository } from '@/infrastructure/database/mongodb/category-mongo-repository'

export const makeDbEditCategory = (): EditCategory => {
  const categoryMongoRepository = new CategoryMongoRepository()
  return new DbEditCategory(categoryMongoRepository, categoryMongoRepository)
}

import { DbAddCategory } from '@/usecases/interactors/category/db-add-category'
import { AddCategory } from '@/usecases/boundaries/inputs/category/add-category'
import { CategoryMongoRepository } from '@/infrastructure/database/mongodb/category-mongo-repository'

export const makeDbAddCategory = (): AddCategory => {
  const categoryMongoRepository = new CategoryMongoRepository()
  return new DbAddCategory(categoryMongoRepository)
}

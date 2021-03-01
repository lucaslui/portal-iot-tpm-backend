import { DbAddCategory } from '@/data/services/category/db-add-category'
import { AddCategory } from '@/domain/usecases/category/add-category'
import { CategoryMongoRepository } from '@/infrastructure/database/mongodb/category-mongo-repository'

export const makeDbAddCategory = (): AddCategory => {
  const categoryMongoRepository = new CategoryMongoRepository()
  return new DbAddCategory(categoryMongoRepository)
}

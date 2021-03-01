import { DbEditCategory } from '@/data/services/category/db-edit-category'
import { EditCategory } from '@/domain/usecases/category/edit-category'
import { CategoryMongoRepository } from '@/infrastructure/database/mongodb/category-mongo-repository'

export const makeDbEditCategory = (): EditCategory => {
  const categoryMongoRepository = new CategoryMongoRepository()
  return new DbEditCategory(categoryMongoRepository, categoryMongoRepository)
}

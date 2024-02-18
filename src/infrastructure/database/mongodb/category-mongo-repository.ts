import { CategoryModel } from '@/domain/entities/category'
import { MongoHelper } from './mongo-helper'
import { AddCategoryModel } from '@/usecases/boundaries/inputs/category/add-category'
import { EditCategoryModel } from '@/usecases/boundaries/inputs/category/edit-category'
import { AddCategoryRepository } from '@/usecases/boundaries/outputs/database/category/add-category-repository'
import { DeleteCategoryRepository } from '@/usecases/boundaries/outputs/database/category/delete-category-repository'
import { EditCategoryRepository } from '@/usecases/boundaries/outputs/database/category/edit-category-repository'
import { LoadCategoriesRepository } from '@/usecases/boundaries/outputs/database/category/load-categories-repository'
import { LoadCategoriesQueryModel } from '@/usecases/boundaries/inputs/category/load-categories'

export class CategoryMongoRepository implements
AddCategoryRepository,
DeleteCategoryRepository,
EditCategoryRepository,
LoadCategoriesRepository {
  async add (category: AddCategoryModel): Promise<CategoryModel> {
    const categoryCollection = await MongoHelper.getCollection('categories')
    const { categoryParentId, ...rest } = category
    const result = await categoryCollection.insertOne({ ...rest, categoryParentId: MongoHelper.toObjectId(categoryParentId) })
    const categoryAdded = result.ops[0]
    return MongoHelper.map(categoryAdded)
  }

  async delete (categoryId: string): Promise<void> {
    const categoryCollection = await MongoHelper.getCollection('categories')
    await categoryCollection.deleteOne({ _id: MongoHelper.toObjectId(categoryId) })
  }

  async edit (categoryId: string, category: EditCategoryModel): Promise<void> {
    const categoryCollection = await MongoHelper.getCollection('categories')
    await categoryCollection.updateOne({ _id: MongoHelper.toObjectId(categoryId) }, {
      $set: {
        name: category.name,
        description: category.description,
        imageUrl: category.imageUrl,
        categoryParentId: MongoHelper.toObjectId(category.categoryParentId)
      }
    })
  }

  async load (query?: LoadCategoriesQueryModel): Promise<CategoryModel[]> {
    const categoryCollection = await MongoHelper.getCollection('categories')
    const pipeline: object[] = []

    if (query?.categoryId) {
      pipeline.push({ $match: { _id: MongoHelper.toObjectId(query.categoryId) } })
    } else if (query?.categoryParentId) {
      pipeline.push({ $match: { categoryParentId: query.categoryParentId } })
    }

    pipeline.push({
      $project: {
        _id: false,
        id: '$_id',
        name: '$name',
        description: '$description',
        imageUrl: '$imageUrl',
        categoryParentId: '$categoryParentId'
      }
    })

    if (query?.page) {
      pipeline.push({ $skip: query?.page ? (query.page * 10 - 10) : 0 }, { $limit: 10 })
    }

    const categories = await categoryCollection.aggregate(pipeline).toArray()
    return categories
  }
}

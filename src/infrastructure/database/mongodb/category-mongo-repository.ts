import { CategoryModel } from '@/domain/entities/category'
import { ObjectId } from 'mongodb'
import { MongoHelper } from './mongo-helper'
import { AddCategoryModel } from '@/domain/usecases/category/add-category'
import { EditCategoryModel } from '@/domain/usecases/category/edit-category'
import { AddCategoryRepository } from '@/data/protocols/database/category/add-category-repository'
import { DeleteCategoryRepository } from '@/data/protocols/database/category/delete-category-repository'
import { EditCategoryRepository } from '@/data/protocols/database/category/edit-category-repository'
import { LoadCategoriesByParentRepository } from '@/data/protocols/database/category/load-categories-by-parent-repository'
import { LoadCategoriesRepository } from '@/data/protocols/database/category/load-categories-repository'
import { LoadCategoryByIdRepository } from '@/data/protocols/database/category/load-category-by-id-repository'

export class CategoryMongoRepository implements
AddCategoryRepository,
DeleteCategoryRepository,
EditCategoryRepository,
LoadCategoriesByParentRepository,
LoadCategoriesRepository,
LoadCategoryByIdRepository {
  async add (category: AddCategoryModel): Promise<CategoryModel> {
    const articleCollection = await MongoHelper.getCollection('categories')
    const result = await articleCollection.insertOne(category)
    const categoryAdded = result.ops[0]
    return MongoHelper.map(categoryAdded)
  }

  async delete (categoryId: string): Promise<void> {
    const articleCollection = await MongoHelper.getCollection('categories')
    await articleCollection.deleteOne({ _id: new ObjectId(categoryId) })
  }

  async edit (categoryId: string, category: EditCategoryModel): Promise<void> {
    const articleCollection = await MongoHelper.getCollection('categories')
    await articleCollection.updateOne({ _id: new ObjectId(categoryId) }, {
      $set: {
        name: category.name,
        description: category.description,
        categoryParentId: category.categoryParentId
      }
    })
  }

  async load (page?: number): Promise<CategoryModel[]> {
    const articleCollection = await MongoHelper.getCollection('categories')
    const articles = await articleCollection.aggregate([{
      $rename: {
        _id: 'id'
      }
    }]).toArray()
    return articles
  }

  async loadById (categoryId: string): Promise<CategoryModel> {
    const articleCollection = await MongoHelper.getCollection('categories')
    const category = await articleCollection.findOne({ _id: new ObjectId(categoryId) })
    return category && MongoHelper.map(category)
  }

  async loadByParent (categoryParentId: string, page?: number): Promise<CategoryModel[]> {
    const articleCollection = await MongoHelper.getCollection('categories')
    const categories = await articleCollection.aggregate([{
      $match: {
        categoryParentId
      },
      $rename: {
        _id: 'id'
      }
    }]).toArray()
    return categories
  }
}

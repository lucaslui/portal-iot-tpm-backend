import { ArticleModel } from '@/domain/entities/article'

import { MongoHelper } from './mongo-helper'
import { AddArticleRepository, AddArticleRepositoryModel } from '@/usecases/boundaries/outputs/database/article/add-article-repository'
import { DeleteArticleRepository } from '@/usecases/boundaries/outputs/database/article/delete-article-repository'
import { EditArticleRepository } from '@/usecases/boundaries/outputs/database/article/edit-article-repository'
import { LoadArticlesRepository } from '@/usecases/boundaries/outputs/database/article/load-articles-repository'
import { EditArticleModel } from '@/usecases/boundaries/inputs/article/edit-article'
import { LoadArticlesQueryModel, LoadArticlesResponseModel } from '@/usecases/boundaries/inputs/article/load-articles'
import { FilterQuery } from 'mongodb'
import { LoadArticleByIdRepository } from '@/usecases/boundaries/outputs/database/article/load-article-by-id-repository'
import { LoadArticleByIdParams, ArticleViewModel } from '@/usecases/boundaries/inputs/article/load-article-by-id'

export class ArticleMongoRepository implements
AddArticleRepository,
DeleteArticleRepository,
EditArticleRepository,
LoadArticlesRepository,
LoadArticleByIdRepository {
  async add (article: AddArticleRepositoryModel): Promise<ArticleModel> {
    const articleCollection = await MongoHelper.getCollection('articles')
    const result = await articleCollection.insertOne({
      title: article.title,
      description: article.description,
      content: article.content,
      imageUrl: article.imageUrl,
      userId: MongoHelper.toObjectId(article.userId),
      categoryIds: article.categoryIds.map(c => MongoHelper.toObjectId(c)),
      updatedAt: new Date(),
      createdAt: new Date()
    })
    const articleAdded = result.ops[0]
    return MongoHelper.map(articleAdded)
  }

  async delete (articleId: string): Promise<void> {
    const articleCollection = await MongoHelper.getCollection('articles')
    await articleCollection.deleteOne({ _id: MongoHelper.toObjectId(articleId) })
  }

  async edit (articleId: string, newArticle: EditArticleModel): Promise<void> {
    const articleCollection = await MongoHelper.getCollection('articles')
    await articleCollection.updateOne({ _id: MongoHelper.toObjectId(articleId) }, {
      $set: {
        title: newArticle.title,
        description: newArticle.description,
        content: newArticle.content,
        imageUrl: newArticle.imageUrl,
        categoryIds: newArticle.categoryIds
      }
    })
  }

  async load (query?: LoadArticlesQueryModel): Promise<LoadArticlesResponseModel> {
    const articleCollection = await MongoHelper.getCollection('articles')
    const pipeline: object[] = []

    const queryMatch: FilterQuery<any> = {}

    if (query) {
      if (query.userId) {
        queryMatch.userId = MongoHelper.toObjectId(query.userId)
      }

      if (query.categoryIds) {
        queryMatch.categoryIds = MongoHelper.toObjectId(query.categoryIds)
      }

      if (query.type) {
        queryMatch.type = query.type
      }
    }

    pipeline.push({ $match: queryMatch })

    pipeline.push({
      $lookup: {
        from: 'categories',
        localField: 'categoryIds',
        foreignField: '_id',
        as: 'categories'
      }
    })

    pipeline.push({
      $lookup: {
        from: 'users',
        localField: 'userId',
        foreignField: '_id',
        as: 'user'
      }
    })

    if (query.month) {
      pipeline.push({
        $redact: {
          $cond: {
            if: { $eq: [{ $month: '$createdAt' }, Number(query.month)] },
            then: '$$KEEP',
            else: '$$PRUNE'
          }
        }
      })
    }

    if (query.year) {
      pipeline.push({
        $redact: {
          $cond: {
            if: { $eq: [{ $year: '$createdAt' }, Number(query.year)] },
            then: '$$KEEP',
            else: '$$PRUNE'
          }
        }
      })
    }

    pipeline.push({
      $project: {
        _id: false,
        id: '$_id',
        title: '$title',
        description: '$description',
        type: '$type',
        content: '$content',
        imageUrl: '$imageUrl',
        user: {
          $arrayElemAt: ['$user', 0]
        },
        categories: '$categories',
        updatedAt: '$updatedAt',
        createdAt: '$createdAt'
      }
    })

    pipeline.push({ $skip: query.page ? (query.page * 10 - 10) : 0 }, { $limit: 10 })

    const count = await articleCollection.countDocuments(queryMatch)
    const articles = await articleCollection.aggregate(pipeline).toArray()

    return {
      articles,
      count,
      page: query.page,
      totalPages: Math.ceil(count / 10),
      totalItems: count
    }
  }

  async loadById (params: LoadArticleByIdParams): Promise<ArticleViewModel> {
    const articleCollection = await MongoHelper.getCollection('articles')
    const pipeline: object[] = []

    pipeline.push({ $match: { _id: MongoHelper.toObjectId(params.articleId) } })

    pipeline.push({
      $lookup: {
        from: 'categories',
        localField: 'categoryIds',
        foreignField: '_id',
        as: 'categories',
        pipeline: [
          {
            $project: {
              _id: false,
              id: '$_id',
              name: '$name',
              description: '$description'
            }
          }
        ]
      }
    })

    pipeline.push({
      $lookup: {
        from: 'users',
        localField: 'userId',
        foreignField: '_id',
        as: 'user'
      }
    })

    pipeline.push({
      $project: {
        _id: false,
        id: '$_id',
        title: '$title',
        description: '$description',
        type: '$type',
        content: '$content',
        imageUrl: '$imageUrl',
        user: {
          $arrayElemAt: ['$user', 0]
        },
        categories: '$categories',
        updatedAt: '$updatedAt',
        createdAt: '$createdAt'
      }
    })

    const article = await articleCollection.aggregate(pipeline).toArray()

    return article[0]
  }
}

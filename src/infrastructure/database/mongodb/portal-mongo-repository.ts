import { MongoHelper } from '@/infrastructure/database/mongodb/mongo-helper'
import { MongoInstance } from '@/infrastructure/database/mongodb/mongo-instance'
import { LoadArticleByIdParams, ArticleViewModel } from '@/usecases/boundaries/inputs/article/load-article-by-id'
import { LoadArticlesQueryModel } from '@/usecases/boundaries/inputs/article/load-articles'
import { LoadCoursesQueryModel, LoadCoursesResponseModel } from '@/usecases/boundaries/inputs/course/load-courses'
import { LoadPortalArticlesResponseModel } from '@/usecases/boundaries/inputs/portal/load-portal-articles'
import { LoadPortalArticleByIdRepository } from '@/usecases/boundaries/outputs/database/portal/load-portal-article-by-id-repository'
import { LoadPortalArticlesRepository } from '@/usecases/boundaries/outputs/database/portal/load-portal-articles-repository'
import { LoadPortalCoursesRepository } from '@/usecases/boundaries/outputs/database/portal/load-portal-courses-repository'
import { FilterQuery } from 'mongodb'

export class PortalMongoRepository implements LoadPortalCoursesRepository, LoadPortalArticlesRepository, LoadPortalArticleByIdRepository {
  async loadCourses(query?: LoadCoursesQueryModel): Promise<LoadCoursesResponseModel> {
    const courseCollection = await MongoInstance.getCollection('courses')
    const pipeline: object[] = []

    const queryMatch: FilterQuery<{ [key: string]: unknown }> = {}

    if (query?.type) {
      queryMatch.type = query.type
    }

    if (query?.userId) {
      queryMatch.userId = MongoHelper.toObjectId(query.userId)
    }

    if (query?.categoryIds) {
      queryMatch.categoryIds = MongoHelper.mapToObjectId(query.categoryIds)
    }

    pipeline.push({ $match: queryMatch })

    if (query.search) {
      queryMatch.$or = [{ title: { $regex: query.search, $options: 'i' } }, { description: { $regex: query.search, $options: 'i' } }]
    }

    pipeline.push({
      $lookup: {
        from: 'users',
        localField: 'userId',
        foreignField: '_id',
        as: 'user',
        pipeline: [
          {
            $project: {
              _id: false,
              id: '$_id',
              name: '$name',
              email: '$email',
              occupation: '$occupation',
              interests: '$interests',
              about: '$about',
              imageUrl: '$imageUrl'
            }
          }
        ]
      }
    })

    pipeline.push({
      $lookup: {
        from: 'categories',
        let: { categoryIds: '$categoryIds' },
        pipeline: [
          {
            $match: {
              $expr: { $in: ['$_id', '$$categoryIds'] }
            }
          },
          {
            $addFields: {
              sort: {
                $indexOfArray: ['$$categoryIds', '$_id']
              }
            }
          },
          { $sort: { sort: 1 } },
          { $addFields: { sort: '$$REMOVE' } },
          {
            $project: {
              _id: false,
              id: '$_id',
              name: '$name',
              description: '$description'
            }
          }
        ],
        as: 'categories'
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
        observation: '$observation',
        imageUrl: '$imageUrl',
        landingPageUrl: '$landingPageUrl',
        registrationPeriod: '$registrationPeriod',
        classPeriod: '$classPeriod',
        classSchedules: '$classSchedules',
        user: {
          $arrayElemAt: ['$user', 0]
        },
        categories: '$categories',
        updatedAt: '$updatedAt',
        createdAt: '$createdAt'
      }
    })

    pipeline.push({ $sort: { createdAt: -1 } })

    if (query.page && query.limit) {
      const limitAsNumber = Number(query.limit)
      const pageAsNumber = Number(query.page)
      pipeline.push(
        {
          $skip: pageAsNumber ? pageAsNumber * limitAsNumber - limitAsNumber : 0
        },
        { $limit: limitAsNumber }
      )
    }

    const count = await courseCollection.countDocuments(queryMatch)
    const courses = await courseCollection.aggregate(pipeline).toArray()

    return {
      data: courses,
      count: courses.length,
      page: query.page,
      totalPages: Math.ceil(count / (query.limit ?? 1)),
      totalItems: count
    }
  }

  async loadArticles(query?: LoadArticlesQueryModel): Promise<LoadPortalArticlesResponseModel> {
    const articleCollection = await MongoInstance.getCollection('articles')
    const pipeline: object[] = []

    const queryMatch: FilterQuery<{ [key: string]: unknown }> = {}

    if (query?.type) {
      queryMatch.type = query.type
    }

    if (query?.state) {
      queryMatch.state = query.state
    }

    if (query?.userId) {
      queryMatch.userId = MongoHelper.toObjectId(query.userId)
    }

    if (query?.categoryIds) {
      queryMatch.categoryIds = MongoHelper.mapToObjectId(query.categoryIds)
    }

    pipeline.push({ $match: queryMatch })

    if (query.search) {
      queryMatch.$or = [{ title: { $regex: query.search, $options: 'i' } }, { description: { $regex: query.search, $options: 'i' } }]
    }

    pipeline.push({
      $lookup: {
        from: 'users',
        localField: 'userId',
        foreignField: '_id',
        as: 'user',
        pipeline: [
          {
            $project: {
              _id: false,
              id: '$_id',
              name: '$name',
              email: '$email',
              occupation: '$occupation',
              interests: '$interests',
              about: '$about',
              imageUrl: '$imageUrl'
            }
          }
        ]
      }
    })

    pipeline.push({
      $lookup: {
        from: 'categories',
        let: { categoryIds: '$categoryIds' },
        pipeline: [
          {
            $match: {
              $expr: { $in: ['$_id', '$$categoryIds'] }
            }
          },
          {
            $addFields: {
              sort: {
                $indexOfArray: ['$$categoryIds', '$_id']
              }
            }
          },
          { $sort: { sort: 1 } },
          { $addFields: { sort: '$$REMOVE' } },
          {
            $project: {
              _id: false,
              id: '$_id',
              name: '$name',
              description: '$description'
            }
          }
        ],
        as: 'categories'
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
        state: '$state',
        readTime: '$readTime',
        imageUrl: '$imageUrl',
        user: {
          $arrayElemAt: ['$user', 0]
        },
        categories: '$categories',
        updatedAt: '$updatedAt',
        createdAt: '$createdAt'
      }
    })

    pipeline.push({ $sort: { createdAt: -1 } })

    if (query.page && query.limit) {
      const limitAsNumber = Number(query.limit)
      const pageAsNumber = Number(query.page)
      pipeline.push(
        {
          $skip: pageAsNumber ? pageAsNumber * limitAsNumber - limitAsNumber : 0
        },
        { $limit: limitAsNumber }
      )
    }

    const count = await articleCollection.countDocuments(queryMatch)
    const articles = await articleCollection.aggregate(pipeline).toArray()

    return {
      articles,
      count: articles.length,
      page: query.page,
      totalPages: Math.ceil(count / (query.limit ?? 1)),
      totalItems: count
    }
  }

  async loadArticlesById(params: LoadArticleByIdParams): Promise<ArticleViewModel> {
    const articleCollection = await MongoInstance.getCollection('articles')
    const pipeline: object[] = []

    pipeline.push({
      $match: { _id: MongoHelper.toObjectId(params.articleId) }
    })

    pipeline.push({
      $lookup: {
        from: 'categories',
        // localField: 'categoryIds',
        // foreignField: '_id',
        // as: 'categories',
        // pipeline: [
        //   {
        //     $project: {
        //       _id: false,
        //       id: '$_id',
        //       name: '$name',
        //       description: '$description'
        //     }
        //   }
        // ]
        let: { categoryIds: '$categoryIds' },
        pipeline: [
          {
            $match: {
              $expr: { $in: ['$_id', '$$categoryIds'] }
            }
          },
          {
            $addFields: {
              sort: {
                $indexOfArray: ['$$categoryIds', '$_id']
              }
            }
          },
          { $sort: { sort: 1 } },
          { $addFields: { sort: '$$REMOVE' } },
          {
            $project: {
              _id: false,
              id: '$_id',
              name: '$name',
              description: '$description'
            }
          }
        ],
        as: 'categories'
      }
    })

    pipeline.push({
      $lookup: {
        from: 'users',
        localField: 'userId',
        foreignField: '_id',
        as: 'user',
        pipeline: [
          {
            $project: {
              _id: false,
              id: '$_id',
              name: '$name',
              email: '$email',
              occupation: '$occupation',
              interests: '$interests',
              about: '$about',
              imageUrl: '$imageUrl'
            }
          }
        ]
      }
    })

    pipeline.push({
      $project: {
        _id: false,
        id: '$_id',
        title: '$title',
        description: '$description',
        type: '$type',
        state: '$state',
        readTime: '$readTime',
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

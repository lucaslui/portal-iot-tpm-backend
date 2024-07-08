import { MongoHelper } from '@/infrastructure/database/mongodb/mongo-helper'
import { LoadCoursesQueryModel, LoadCoursesResponseModel } from '@/usecases/boundaries/inputs/course/load-courses'
import { LoadPortalCoursesRepository } from '@/usecases/boundaries/outputs/database/portal/load-portal-courses-repository'
import { FilterQuery } from 'mongodb'

export class PortalMongoRepository implements
LoadPortalCoursesRepository {
  async loadCourses (query?: LoadCoursesQueryModel): Promise<LoadCoursesResponseModel> {
    const courseCollection = await MongoHelper.getCollection('courses')
    const pipeline: object[] = []

    const queryMatch: FilterQuery<any> = {}

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
      queryMatch.$or = [
        { title: { $regex: query.search, $options: 'i' } },
        { description: { $regex: query.search, $options: 'i' } }
      ]
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
      pipeline.push({ $skip: pageAsNumber ? (pageAsNumber * limitAsNumber - limitAsNumber) : 0 }, { $limit: limitAsNumber })
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
}

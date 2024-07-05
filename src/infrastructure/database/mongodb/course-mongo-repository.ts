import { CourseModel } from '@/domain/entities/course'
import { MongoHelper } from '@/infrastructure/database/mongodb/mongo-helper'
import { LoadCourseByIdParams, CourseViewModel } from '@/usecases/boundaries/inputs/course/load-course-by-id'
import { LoadCoursesQueryModel, LoadCoursesResponseModel } from '@/usecases/boundaries/inputs/course/load-courses'
import { AddCourseRepository, AddCourseRepositoryModel } from '@/usecases/boundaries/outputs/database/course/add-course-repository'
import { DeleteCourseRepository } from '@/usecases/boundaries/outputs/database/course/delete-course-repository'
import { EditCourseRepository, EditCourseRepositoryModel } from '@/usecases/boundaries/outputs/database/course/edit-course-repository'
import { LoadCourseByIdRepository } from '@/usecases/boundaries/outputs/database/course/load-course-by-id-repository'
import { LoadCoursesRepository } from '@/usecases/boundaries/outputs/database/course/load-courses-repository'
import { FilterQuery } from 'mongodb'

export class CourseMongoRepository implements
AddCourseRepository,
EditCourseRepository,
DeleteCourseRepository,
LoadCoursesRepository,
LoadCourseByIdRepository {
  async add (course: AddCourseRepositoryModel): Promise<CourseModel> {
    const courseCollection = await MongoHelper.getCollection('courses')
    const result = await courseCollection.insertOne({
      title: course.title,
      description: course.description,
      type: course.type,
      observation: course.observation,
      landingPageUrl: course.landingPageUrl,
      imageUrl: course.imageUrl,
      userId: MongoHelper.toObjectId(course.userId),
      categoryIds: MongoHelper.mapToObjectId(course.categoryIds),
      updatedAt: new Date(),
      createdAt: new Date()
    })
    const courseAdded = result.ops[0]
    return MongoHelper.map(courseAdded)
  }

  async edit (courseId: string, newCourse: EditCourseRepositoryModel): Promise<void> {
    const courseCollection = await MongoHelper.getCollection('courses')
    const newCourseWithAllowedFields = {
      title: newCourse.title,
      description: newCourse.description,
      type: newCourse.type,
      observation: newCourse.observation,
      landingPageUrl: newCourse.landingPageUrl,
      imageUrl: newCourse.imageUrl,
      categoryIds: MongoHelper.mapToObjectId(newCourse.categoryIds),
      updatedAt: new Date()
    }
    const newCourseWithoutNullOrUndefinedValues = Object.keys(newCourseWithAllowedFields).reduce((acc, key) => {
      if (newCourseWithAllowedFields[key] !== null && newCourseWithAllowedFields[key] !== undefined) {
        acc[key] = newCourseWithAllowedFields[key]
      }
      return acc
    }, {})

    await courseCollection.updateOne({ _id: MongoHelper.toObjectId(courseId) }, { $set: { ...newCourseWithoutNullOrUndefinedValues } })
  }

  async delete (courseId: string): Promise<void> {
    const courseCollection = await MongoHelper.getCollection('courses')
    await courseCollection.deleteOne({ _id: MongoHelper.toObjectId(courseId) })
  }

  async load (query?: LoadCoursesQueryModel): Promise<LoadCoursesResponseModel> {
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

  async loadById (params: LoadCourseByIdParams): Promise<CourseViewModel> {
    const courseCollection = await MongoHelper.getCollection('courses')
    const pipeline: object[] = []

    pipeline.push({ $match: { _id: MongoHelper.toObjectId(params.courseId) } })

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

    const course = await courseCollection.aggregate(pipeline).toArray()

    return course[0]
  }
}

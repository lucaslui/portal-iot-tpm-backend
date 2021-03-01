import { ArticleModel } from '@/domain/entities/article'
import { ObjectId } from 'mongodb'
import { MongoHelper } from './mongo-helper'
import { AddArticleRepository } from '@/data/protocols/database/article/add-article-repository'
import { DeleteArticleRepository } from '@/data/protocols/database/article/delete-article-repository'
import { EditArticleRepository } from '@/data/protocols/database/article/edit-article-repository'
import { LoadArticlesRepository } from '@/data/protocols/database/article/load-articles-repository'
import { AddArticleModel } from '@/domain/usecases/article/add-article'
import { EditArticleModel } from '@/domain/usecases/article/edit-article'
import { LoadArticlesQueryModel } from '@/domain/usecases/article/load-articles'

export class ArticleMongoRepository implements
AddArticleRepository,
DeleteArticleRepository,
EditArticleRepository,
LoadArticlesRepository {
  async add (article: AddArticleModel): Promise<ArticleModel> {
    const articleCollection = await MongoHelper.getCollection('articles')
    const { userId, categoryId, ...rest } = article
    const result = await articleCollection.insertOne({ ...rest, userId: new ObjectId(userId), categoryId: new ObjectId(categoryId) })
    const articleAdded = result.ops[0]
    return MongoHelper.map(articleAdded)
  }

  async delete (articleId: string): Promise<void> {
    const articleCollection = await MongoHelper.getCollection('articles')
    await articleCollection.deleteOne({ _id: new ObjectId(articleId) })
  }

  async edit (articleId: string, newArticle: EditArticleModel): Promise<void> {
    const articleCollection = await MongoHelper.getCollection('articles')
    await articleCollection.updateOne({ _id: new ObjectId(articleId) }, {
      $set: {
        title: newArticle.title,
        description: newArticle.description,
        content: newArticle.content,
        imageUrl: newArticle.imageUrl,
        categoryId: new ObjectId(newArticle.categoryId)
      }
    })
  }

  async load (query?: LoadArticlesQueryModel): Promise<ArticleModel[]> {
    const articleCollection = await MongoHelper.getCollection('articles')
    const pipeline: object[] = []

    if (query.articleId) {
      pipeline.push({ $match: { _id: new ObjectId(query.articleId) } })
    } else if (query.userId || query.categoryId) {
      if (query.userId) {
        pipeline.push({ $match: { userId: new ObjectId(query.userId) } })
      }
      if (query.categoryId) {
        pipeline.push({ $match: { categoryId: new ObjectId(query.categoryId) } })
      }
    }

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
        content: '$content',
        imageUrl: '$imageUrl',
        userId: '$userId',
        categoryId: '$categoryId',
        createdAt: '$createdAt'
      }
    })

    pipeline.push({ $skip: query.page ? (query.page * 10 - 10) : 0 }, { $limit: 10 })

    const articles = await articleCollection.aggregate(pipeline).toArray()

    return articles
  }
}

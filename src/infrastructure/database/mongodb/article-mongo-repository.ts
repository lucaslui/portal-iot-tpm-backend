import { ArticleModel } from '@/domain/entities/article'

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

  async load (query?: LoadArticlesQueryModel): Promise<ArticleModel[]> {
    const articleCollection = await MongoHelper.getCollection('articles')
    const pipeline: object[] = []

    if (query.articleId) {
      pipeline.push({ $match: { _id: MongoHelper.toObjectId(query.articleId) } })
    } else if (query.userId || query.categoryIds) {
      if (query.userId) {
        pipeline.push({ $match: { userId: MongoHelper.toObjectId(query.userId) } })
      }
      if (query.categoryIds) {
        pipeline.push({ $match: { categoryIds: MongoHelper.toObjectId(query.categoryIds) } })
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
        categoryIds: '$categoryIds',
        updatedAt: '$updatedAt',
        createdAt: '$createdAt'
      }
    })

    pipeline.push({ $skip: query.page ? (query.page * 10 - 10) : 0 }, { $limit: 10 })

    const articles = await articleCollection.aggregate(pipeline).toArray()

    return articles
  }
}

import { ArticleModel } from '@/domain/entities/article'
import { ObjectId } from 'mongodb'
import { MongoHelper } from './mongo-helper'
import { AddArticleRepository } from '@/data/protocols/database/article/add-article-repository'
import { DeleteArticleRepository } from '@/data/protocols/database/article/delete-article-repository'
import { EditArticleRepository } from '@/data/protocols/database/article/edit-article-repository'
import { LoadArticleByIdRepository } from '@/data/protocols/database/article/load-article-by-id-repository'
import { LoadArticlesByCategoryRepository } from '@/data/protocols/database/article/load-articles-by-category'
import { LoadArticlesRepository } from '@/data/protocols/database/article/load-articles'
import { AddArticleModel } from '@/domain/usecases/article/add-article'
import { EditArticleModel } from '@/domain/usecases/article/edit-article'
import { LoadArticlesByUserRepository } from '@/data/protocols/database/article/load-articles-by-user'

export class ArticleMongoRepository implements
AddArticleRepository,
DeleteArticleRepository,
EditArticleRepository,
LoadArticleByIdRepository,
LoadArticlesByCategoryRepository,
LoadArticlesByUserRepository,
LoadArticlesRepository {
  async add (article: AddArticleModel): Promise<ArticleModel> {
    const articleCollection = await MongoHelper.getCollection('articles')
    const result = await articleCollection.insertOne(article)
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
        categoryId: newArticle.categoryId
      }
    })
  }

  async load (page?: number): Promise<ArticleModel[]> {
    const articleCollection = await MongoHelper.getCollection('articles')
    const articles = await articleCollection.aggregate([{
      $rename: {
        _id: 'id'
      }
    }]).toArray()
    return articles
  }

  async loadById (articleId: string): Promise<ArticleModel> {
    const articleCollection = await MongoHelper.getCollection('articles')
    const article = await articleCollection.findOne({ _id: new ObjectId(articleId) })
    return article && MongoHelper.map(article)
  }

  async loadByCategory (categoryId: string, page?: number): Promise<ArticleModel[]> {
    const articleCollection = await MongoHelper.getCollection('articles')
    const articles = await articleCollection.aggregate([{
      $match: {
        categoryId
      },
      $rename: {
        _id: 'id'
      }
    }]).toArray()
    return articles
  }

  async loadByUser (userId: string, page?: number): Promise<ArticleModel[]> {
    const articleCollection = await MongoHelper.getCollection('articles')
    const articles = await articleCollection.aggregate([{
      $match: {
        userId: new ObjectId(userId)
      },
      $rename: {
        _id: 'id'
      }
    }]).toArray()
    return articles
  }
}

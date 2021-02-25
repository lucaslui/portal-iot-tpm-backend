import { CreateUserRepository } from '@/data/protocols/database/create-user-repository'
import { LoadUserByIdRepository } from '@/data/protocols/database/load-user-by-id-repository'
import { LoadUserByTokenRepository } from '@/data/protocols/database/load-user-by-token-repository'
import { LoadUserByEmailRepository } from '@/data/protocols/database/load-user-by-username-repository'
import { UpdateAccessTokenRepository } from '@/data/protocols/database/update-access-token-repository'
import { UserModel } from '@/domain/entities/user'
import { CreateUserParamsModel } from '@/domain/usecases/auth/create-user'
import { MongoHelper } from './mongo-helper'

export class UserMongoRepository implements CreateUserRepository, LoadUserByIdRepository, LoadUserByEmailRepository, UpdateAccessTokenRepository, LoadUserByTokenRepository {
  async create (createUserParams: CreateUserParamsModel): Promise<UserModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(createUserParams)
    const account = result.ops[0]
    return MongoHelper.map(account)
  }

  async loadById (accountId: string): Promise<UserModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({ _id: accountId })
    return account && MongoHelper.map(account)
  }

  async loadByEmail (email: string): Promise<UserModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({ email })
    return account && MongoHelper.map(account)
  }

  async loadByToken (token: string, role?: string): Promise<UserModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({
      accessToken: token,
      $or: [{
        role
      }, {
        role: 'admin'
      }]

    })
    return account && MongoHelper.map(account)
  }

  async updateAccessToken (id: string, token: string): Promise<void> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.updateOne({
      _id: id
    }, {
      $set: {
        accessToken: token
      }
    }
    )
  }
}

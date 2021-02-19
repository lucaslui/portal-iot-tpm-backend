import { LoadAccountByIdRepository } from '@/data/protocols/database/load-account-by-id-repository'
import { LoadAccountByTokenRepository } from '@/data/protocols/database/load-account-by-token-repository'
import { LoadAccountByUsernameRepository } from '@/data/protocols/database/load-account-by-username-repository'
import { UpdateAccessTokenRepository } from '@/data/protocols/database/update-access-token-repository'
import { AccountModel } from '@/domain/entities/account'
import { MongoHelper } from '../helpers/mongo-helper'

export class AccountMongoRepository implements LoadAccountByIdRepository, LoadAccountByUsernameRepository, UpdateAccessTokenRepository, LoadAccountByTokenRepository {
  async loadById (accountId: string): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({ _id: accountId })
    return account && MongoHelper.map(account)
  }

  async loadByUsername (email: string): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({ email })
    return account && MongoHelper.map(account)
  }

  async loadByToken (token: string, role?: string): Promise<AccountModel> {
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

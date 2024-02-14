import { AddUserRepository } from '@/usecases/boundaries/outputs/database/auth/add-user-repository'
import { LoadUserByIdRepository } from '@/usecases/boundaries/outputs/database/auth/load-user-by-id-repository'
import { LoadUserByTokenRepository } from '@/usecases/boundaries/outputs/database/auth/load-user-by-token-repository'
import { LoadUserByEmailRepository } from '@/usecases/boundaries/outputs/database/auth/load-user-by-username-repository'
import { UpdateAccessTokenRepository } from '@/usecases/boundaries/outputs/database/auth/update-access-token-repository'
import { ChangeUserPasswordRepository } from '@/usecases/boundaries/outputs/database/user/change-user-password-repository'
import { UpdateUserRepository, UpdateUserRepositoryData } from '@/usecases/boundaries/outputs/database/user/edit-user-profile-respository'
import { LoadUsersRepository } from '@/usecases/boundaries/outputs/database/user/load-users-repository'
import { UserModel } from '@/domain/entities/user'
import { AddUserParamsModel } from '@/usecases/boundaries/inputs/auth/add-user'
import { MongoHelper } from './mongo-helper'

export class UserMongoRepository implements
AddUserRepository,
UpdateUserRepository,
LoadUserByIdRepository,
LoadUserByEmailRepository,
UpdateAccessTokenRepository,
LoadUserByTokenRepository,
LoadUsersRepository,
ChangeUserPasswordRepository {
  async add (createUserParams: AddUserParamsModel): Promise<boolean> {
    const userCollection = await MongoHelper.getCollection('users')
    const result = await userCollection.insertOne({
      ...createUserParams,
      updatedAt: new Date(),
      createdAt: new Date()
    })
    const user = result.ops[0]
    return user !== null
  }

  async update (userId: string, data: UpdateUserRepositoryData): Promise<void> {
    const userCollection = await MongoHelper.getCollection('users')
    await userCollection.updateOne({ _id: MongoHelper.toObjectId(userId) }, { $set: { ...data, updatedAt: new Date() } })
  }

  async updateAccessToken (id: string, token: string): Promise<void> {
    const userCollection = await MongoHelper.getCollection('users')
    await userCollection.updateOne({ _id: MongoHelper.toObjectId(id) }, { $set: { accessToken: token } })
  }

  async changePassword (userId: string, hashedPassword: string): Promise<void> {
    const userCollection = await MongoHelper.getCollection('users')
    await userCollection.updateOne({ _id: MongoHelper.toObjectId(userId) }, { $set: { password: hashedPassword } })
  }

  async loadById (userId: string): Promise<UserModel> {
    const userCollection = await MongoHelper.getCollection('users')
    const user = await userCollection.findOne({ _id: MongoHelper.toObjectId(userId) })
    return user && MongoHelper.map(user)
  }

  async loadByEmail (email: string): Promise<UserModel> {
    const userCollection = await MongoHelper.getCollection('users')
    const user = await userCollection.findOne({ email })
    return user && MongoHelper.map(user)
  }

  async loadByToken (token: string, role?: string): Promise<UserModel> {
    const userCollection = await MongoHelper.getCollection('users')
    const user = await userCollection.findOne({
      accessToken: token,
      $or: [{
        role
      }, {
        role: 'admin'
      }]

    })
    return user && MongoHelper.map(user)
  }

  async loadUsers (page?: number): Promise<UserModel[]> {
    const userCollection = await MongoHelper.getCollection('users')
    const users = await userCollection.aggregate([{
      $project: {
        name: '$name',
        email: '$email',
        nickname: '$profile.nickname',
        createdAt: '$createdAt'
      }
    }]).toArray()
    return users
  }
}

import { CreateUserRepository } from '@/data/protocols/database/auth/create-user-repository'
import { LoadUserByIdRepository } from '@/data/protocols/database/auth/load-user-by-id-repository'
import { LoadUserByTokenRepository } from '@/data/protocols/database/auth/load-user-by-token-repository'
import { LoadUserByEmailRepository } from '@/data/protocols/database/auth/load-user-by-username-repository'
import { UpdateAccessTokenRepository } from '@/data/protocols/database/auth/update-access-token-repository'
import { ChangeUserPasswordRepository } from '@/data/protocols/database/user/change-user-password-repository'
import { EditUserProfileRepository } from '@/data/protocols/database/user/edit-user-profile-respository'
import { LoadUsersRepository } from '@/data/protocols/database/user/load-users-repository'
import { LoadUserProfileRepository } from '@/data/protocols/database/user/load-user-profile-repository'
import { ProfileModel, UserModel } from '@/domain/entities/user'
import { CreateUserParamsModel } from '@/domain/usecases/auth/create-user'
import { MongoHelper } from './mongo-helper'

export class UserMongoRepository implements
CreateUserRepository,
LoadUserByIdRepository,
LoadUserByEmailRepository,
UpdateAccessTokenRepository,
LoadUserByTokenRepository,
LoadUsersRepository,
LoadUserProfileRepository,
EditUserProfileRepository,
ChangeUserPasswordRepository {
  async create (createUserParams: CreateUserParamsModel): Promise<boolean> {
    const userCollection = await MongoHelper.getCollection('users')
    const result = await userCollection.insertOne(createUserParams)
    const user = result.ops[0]
    return user !== null
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

  async loadProfile (userId: string): Promise<ProfileModel> {
    const userCollection = await MongoHelper.getCollection('users')
    const user = await userCollection.findOne({ _id: MongoHelper.toObjectId(userId) })
    return user?.profile || null
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

  async updateAccessToken (id: string, token: string): Promise<void> {
    const userCollection = await MongoHelper.getCollection('users')
    await userCollection.updateOne({ _id: MongoHelper.toObjectId(id) }, { $set: { accessToken: token } })
  }

  async changePassword (userId: string, hashedPassword: string): Promise<void> {
    const userCollection = await MongoHelper.getCollection('users')
    await userCollection.updateOne({ _id: MongoHelper.toObjectId(userId) }, { $set: { password: hashedPassword } })
  }

  async editProfile (userId: string, userProfile: ProfileModel): Promise<void> {
    const userCollection = await MongoHelper.getCollection('users')
    await userCollection.updateOne({ _id: MongoHelper.toObjectId(userId) }, { $set: { profile: userProfile } })
  }
}

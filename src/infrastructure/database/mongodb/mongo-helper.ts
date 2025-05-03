import { ObjectId } from 'mongodb'

export const MongoHelper = {
  toObjectId(data: string): ObjectId {
    return new ObjectId(data)
  },

  mapToObjectId(data: string[]): ObjectId[] {
    return data.map((d) => this.toObjectId(d))
  },

  map<T>(data: { _id: ObjectId; rest: Omit<T, '_id'> }): T {
    const { _id, ...rest } = data
    return { ...rest, id: _id } as T
  },

  mapCollection<T>(collection: { _id: ObjectId; rest: Omit<T, '_id'> }[]): { id: ObjectId; rest: Omit<T, '_id'> }[] {
    return collection.map((c) => this.map(c))
  }
}

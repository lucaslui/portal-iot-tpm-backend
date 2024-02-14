export type UpdateUserRepositoryData = {
  name: string
  email: string
  occupation?: string
  interests?: string
  about?: string
  imageUrl?: string
}

export interface UpdateUserRepository {
  update: (userId: string, params: UpdateUserRepositoryData) => Promise<void>
}

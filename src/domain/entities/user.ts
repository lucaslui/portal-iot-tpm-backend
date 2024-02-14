export interface UserModel {
  id: string
  name: string
  email: string
  profile?: UserProfileModel
  password?: string
  updatedAt: Date
  createdAt: Date
}

export interface UserProfileModel {
  occupation?: string
  interests?: string
  about?: string
  imageUrl?: string
}

export interface UserModel {
  id: string
  name: string
  email: string
  password?: string
  occupation?: string
  interests?: string
  about?: string
  imageUrl?: string
  updatedAt: Date
  createdAt: Date
}

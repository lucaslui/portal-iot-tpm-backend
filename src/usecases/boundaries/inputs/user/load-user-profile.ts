export type UserProfileViewModel = {
  name: string
  email: string
  occupation?: string
  interests?: string
  about?: string
  imageUrl?: string
  updatedAt: Date
  createdAt: Date
}

export interface LoadUserProfile {
  loadProfile: (userId: string) => Promise<UserProfileViewModel>
}

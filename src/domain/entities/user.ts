export interface UserModel {
  id: string
  name: string
  email: string
  password: string
  profile: ProfileModel
}

export interface ProfileModel {
  nickname: string
  occupation?: string
  region: string
  about: string
  interests: string
  contact: string
  website: string
}

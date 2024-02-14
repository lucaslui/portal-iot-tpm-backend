export type EditUserProfileData = {
  name: string
  email: string
  occupation?: string
  interests?: string
  about?: string
  imageBinary?: Buffer
}
export interface EditUserProfile {
  edit: (userId: string, data: EditUserProfileData) => Promise<void>
}

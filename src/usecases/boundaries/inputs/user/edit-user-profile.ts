import { ImageBinary } from '@/usecases/models/image-binary'

export type EditUserProfileData = {
  name: string
  email: string
  occupation?: string
  interests?: string
  about?: string
  imageBinary?: ImageBinary
}
export interface EditUserProfile {
  edit: (userId: string, data: EditUserProfileData) => Promise<void>
}

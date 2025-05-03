import { ImageBinary } from '@/usecases/models/image-binary'

export interface UploadImageStorage {
  upload: (file: ImageBinary, folder: string) => Promise<string>
}

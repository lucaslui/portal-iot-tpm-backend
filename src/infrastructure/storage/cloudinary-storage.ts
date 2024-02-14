import { v2 as cloudinary } from 'cloudinary'

import { ImageStorage } from '@/usecases/boundaries/outputs/storage/image-storage'

export class CloudinaryImageStorage implements ImageStorage {
  constructor (
    private readonly cloudName: string,
    private readonly apiKey: string,
    private readonly apiSecret: string
  ) {
    cloudinary.config({
      cloud_name: this.cloudName,
      api_key: this.apiKey,
      api_secret: this.apiSecret
    })
  }

  async upload (file: Express.Multer.File, folder: string): Promise<string> {
    const b64 = file.buffer.toString('base64')
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    const dataURI = `data:${file.mimetype};base64,${b64}`
    const response = await cloudinary.uploader.upload(dataURI, { folder })
    return response.secure_url
  }

  async delete (fileId: string): Promise<void> {
    await cloudinary.uploader.destroy(fileId)
  }
}

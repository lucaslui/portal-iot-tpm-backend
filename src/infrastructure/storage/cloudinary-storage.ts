import { v2 as cloudinary } from 'cloudinary'

import { UploadImageStorage } from '@/usecases/boundaries/outputs/storage/upload-image-storage'
import { DeleteImageStorage } from '@/usecases/boundaries/outputs/storage/delete-image-storage'

export class CloudinaryImageStorage implements UploadImageStorage, DeleteImageStorage {
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

  async upload (file: Express.Multer.File | string, folder: string): Promise<string> {
    let dataURI = ''

    if (typeof file === 'string') {
      dataURI = file
    } else {
      const b64 = file.buffer.toString('base64')
      dataURI = `data:${file.mimetype};base64,${b64}`
    }

    const response = await cloudinary.uploader.upload(dataURI, { folder })
    return response.secure_url
  }

  async delete (fileId: string): Promise<void> {
    await cloudinary.uploader.destroy(fileId)
  }
}

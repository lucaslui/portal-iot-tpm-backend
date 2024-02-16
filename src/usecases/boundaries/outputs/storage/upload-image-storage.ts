export interface UploadImageStorage {
  upload: (file: any, folder: string) => Promise<string>
}

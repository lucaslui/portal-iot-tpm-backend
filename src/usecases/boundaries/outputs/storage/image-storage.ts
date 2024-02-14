export interface ImageStorage {
  upload: (file: any, folder: string) => Promise<string>
}

export interface ImageStorage {
  upload: (file: any) => Promise<string>
}

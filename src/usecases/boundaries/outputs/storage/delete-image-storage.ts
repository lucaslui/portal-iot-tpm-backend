export interface DeleteImageStorage {
  delete: (fileId: string) => Promise<void>
}

export interface DeleteCategory {
  delete: (categoryId: string) => Promise<boolean>
}

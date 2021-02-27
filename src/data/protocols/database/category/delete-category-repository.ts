export interface DeleteCategoryRepository {
  delete: (categoryId: string) => Promise<void>
}

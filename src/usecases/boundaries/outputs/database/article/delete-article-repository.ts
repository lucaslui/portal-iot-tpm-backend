export interface DeleteArticleRepository {
  delete: (articleId: string) => Promise<void>
}

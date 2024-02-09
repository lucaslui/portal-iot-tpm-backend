export interface DeleteArticle {
  delete: (userId: string, articleId: string) => Promise<boolean>
}

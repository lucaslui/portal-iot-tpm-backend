export interface DeleteCourseRepository {
  delete: (articleId: string) => Promise<void>
}

export interface DeleteCourse {
  delete: (userId: string, courseId: string) => Promise<boolean>
}

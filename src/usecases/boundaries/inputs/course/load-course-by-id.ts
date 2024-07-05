export type LoadCourseByIdParams = {
  courseId: string
}

export type CourseViewModel = {
  id: string
  title: string
  description: string
  content: string
  imageUrl: string
  type: string
  state: string
  readTime: number
  user: {
    id: string
    name: string
    email: string
    occupation: string
    interests: string
    about: string
    imageUrl: string
  }
  categories: {
    id: string
    name: string
    description: string
  }
  createdAt: Date
  updatedAt: Date
}

export interface LoadCourseById {
  loadById: (params: LoadCourseByIdParams) => Promise<CourseViewModel>
}

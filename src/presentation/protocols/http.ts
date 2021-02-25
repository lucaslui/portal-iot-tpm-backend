export interface HttpRequest {
  headers?: any
  body?: any
  params?: any
  query?: any
  userId?: string
}

export interface HttpResponse {
  statusCode: number
  body: any
}

export interface HttpRequest {
  headers?: any
  body?: any
  params?: any
  query?: any
  userId?: string
  file?: any
}

export interface HttpResponse {
  statusCode: number
  body: any
}

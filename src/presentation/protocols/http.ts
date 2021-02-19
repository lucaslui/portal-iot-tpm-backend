export interface HttpRequest {
  headers?: any
  body?: any
  params?: any
  query?: any
  accountId?: string
}

export interface HttpResponse {
  statusCode: number
  body: any
}

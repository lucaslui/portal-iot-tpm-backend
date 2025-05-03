export interface HttpRequest {
  headers?: unknown
  body?: unknown
  params?: unknown
  query?: unknown
  userId?: string
  file?: unknown
}

export interface HttpResponse {
  statusCode: number
  body: unknown
}

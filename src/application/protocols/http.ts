/* eslint-disable @typescript-eslint/no-explicit-any */
export interface HttpRequest {
  headers?: any
  body?: any
  params?: any
  query?: any
  file?: any
  userId?: string
}

export interface HttpResponse {
  statusCode: number
  body: unknown
}

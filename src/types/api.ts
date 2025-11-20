export interface BackendError {
  detail: {
    error_code: string
    message: string
  }
}

export enum APIErrorCode {
  InvalidCredentials = "INVALID_CREDENTIALS",
  UnknownError = "UNKNOWN_ERROR",
}

export interface APIError {
  message: string
  status: number
  code: APIErrorCode
}
export interface PaginatedResponse<T> {
  items: T[]
  total: number
  skip: number
  limit: number
}

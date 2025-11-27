export interface BackendError {
  detail: {
    error_code: string
    message: string
  }
}

export enum APIErrorCode {
  // Authentication & Authorization
  InvalidCredentials = "INVALID_CREDENTIALS",
  Unauthorized = "UNAUTHORIZED",
  Forbidden = "FORBIDDEN",

  // Validation
  ValidationError = "VALIDATION_ERROR",
  InvalidInput = "INVALID_INPUT",

  // Resources
  NotFound = "NOT_FOUND",
  AlreadyExists = "ALREADY_EXISTS",

  // Business Logic
  BusinessLogicError = "BUSINESS_LOGIC_ERROR",

  // External Services
  ExternalServiceError = "EXTERNAL_SERVICE_ERROR",
  DatabaseError = "DATABASE_ERROR",

  // Rate Limiting
  RateLimit = "RATE_LIMIT_EXCEEDED",

  // General
  InternalError = "INTERNAL_ERROR",
  UnknownError = "UNKNOWN_ERROR",
}

export interface APIError {
  message: string
  status: number
  code: APIErrorCode
}
export interface PaginatedResponse<T> {
  transactions: T[]
  total: number
  offset: number
  limit: number
}

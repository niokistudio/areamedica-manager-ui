import { APIErrorCode } from "@/types/api"

/**
 * Base application error class
 * All custom errors should extend this class
 */
export class AppError extends Error {
  public readonly code: string
  public readonly statusCode: number
  public readonly context?: Record<string, unknown>
  public readonly isOperational: boolean

  constructor(
    message: string,
    code: string = "INTERNAL_ERROR",
    statusCode: number = 500,
    context?: Record<string, unknown>,
    isOperational: boolean = true,
  ) {
    super(message)

    this.name = this.constructor.name
    this.code = code
    this.statusCode = statusCode
    this.context = context
    this.isOperational = isOperational

    // Maintains proper stack trace for where error was thrown
    Error.captureStackTrace(this, this.constructor)
  }

  /**
   * Convert error to JSON for API responses
   */
  toJSON() {
    return {
      message: this.message,
      code: this.code,
      status: this.statusCode,
      ...(this.context && { details: this.context }),
    }
  }
}

/**
 * Authentication/Authorization errors (401/403)
 */
export class AuthenticationError extends AppError {
  constructor(
    message: string = "Authentication failed",
    context?: Record<string, unknown>,
  ) {
    super(message, APIErrorCode.InvalidCredentials, 401, context)
  }
}

/**
 * Validation errors (400)
 */
export class ValidationError extends AppError {
  constructor(
    message: string = "Validation failed",
    context?: Record<string, unknown>,
  ) {
    super(message, APIErrorCode.ValidationError, 400, context)
  }
}

/**
 * Not found errors (404)
 */
export class NotFoundError extends AppError {
  constructor(
    resource: string = "Resource",
    context?: Record<string, unknown>,
  ) {
    super(`${resource} not found`, APIErrorCode.NotFound, 404, context)
  }
}

/**
 * External service errors (502/503)
 */
export class ExternalServiceError extends AppError {
  constructor(
    service: string,
    message: string = "External service error",
    context?: Record<string, unknown>,
  ) {
    super(message, APIErrorCode.ExternalServiceError, 502, {
      service,
      ...context,
    })
  }
}

/**
 * Database errors (500)
 */
export class DatabaseError extends AppError {
  constructor(
    message: string = "Database operation failed",
    context?: Record<string, unknown>,
  ) {
    super(message, APIErrorCode.DatabaseError, 500, context)
  }
}

/**
 * Rate limiting errors (429)
 */
export class RateLimitError extends AppError {
  constructor(
    message: string = "Too many requests",
    context?: Record<string, unknown>,
  ) {
    super(message, APIErrorCode.RateLimit, 429, context)
  }
}

/**
 * Business logic errors (422)
 */
export class BusinessLogicError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, APIErrorCode.BusinessLogicError, 422, context)
  }
}

/**
 * Check if the error is an operational error (expected) vs. programming error (bug)
 */
export function isOperationalError(error: unknown): boolean {
  if (error instanceof AppError) {
    return error.isOperational
  }
  return false
}

/**
 * Type guard for AppError
 */
export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError
}

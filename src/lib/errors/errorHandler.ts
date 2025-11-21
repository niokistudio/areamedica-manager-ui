import "server-only"
import { NextResponse } from "next/server"
import { logError } from "@/lib/logger/server"
import { type APIError, APIErrorCode, type BackendError } from "@/types/api"
import {
  AppError,
  AuthenticationError,
  ExternalServiceError,
  isAppError,
} from "./AppError"

/**
 * Handle errors in API routes
 * Logs error and returns appropriate NextResponse
 *
 * @param error - Error to handle
 * @param context - Additional context for logging
 * @returns NextResponse with error details
 *
 * @example
 * export async function POST(request: Request) {
 *   try {
 *     // ... operation
 *   } catch (error) {
 *     return handleAPIError(error, {
 *       endpoint: '/api/auth/login',
 *       method: 'POST'
 *     })
 *   }
 * }
 */
export function handleAPIError(
  error: unknown,
  context: Record<string, unknown> = {},
): NextResponse<APIError> {
  // Handle our custom AppError
  if (isAppError(error)) {
    logError(error, {
      ...context,
      errorCode: error.code,
      statusCode: error.statusCode,
      isOperational: error.isOperational,
      errorContext: error.context,
    })

    return NextResponse.json(error.toJSON() as APIError, {
      status: error.statusCode,
    })
  }

  // Handle standard JavaScript errors
  if (error instanceof Error) {
    logError(error, {
      ...context,
      errorType: error.name,
    })

    return NextResponse.json(
      {
        message: error.message || "An unexpected error occurred",
        code: APIErrorCode.InternalError,
        status: 500,
      },
      { status: 500 },
    )
  }

  // Handle unknown error types
  logError(error, context, "Unknown error type")

  return NextResponse.json(
    {
      message: "An unexpected error occurred",
      code: APIErrorCode.UnknownError,
      status: 500,
    },
    { status: 500 },
  )
}

/**
 * Transform backend errors into AppError
 * Converts backend error responses into our custom error format
 *
 * @param error - Error from backend API call
 * @param operation - Name of the operation that failed
 * @returns AppError instance
 *
 * @example
 * try {
 *   await fetchPost('/auth/login', credentials)
 * } catch (error) {
 *   throw transformBackendError(error, 'login')
 * }
 */
export function transformBackendError(
  error: unknown,
  operation: string,
): AppError {
  // Handle axios/fetch errors with response
  if (error && typeof error === "object" && "response" in error) {
    const response = (error as any).response
    const data = response?.data as BackendError | undefined

    // Transform backend error to our format
    if (data?.detail) {
      const statusCode = response?.status || 500
      const errorCode = data.detail.error_code
      const message = data.detail.message || "Backend error"

      // Map to appropriate error class
      if (statusCode === 401 || statusCode === 403) {
        return new AuthenticationError(message, {
          operation,
          backendCode: errorCode,
        })
      }

      return new ExternalServiceError("backend-api", message, {
        operation,
        statusCode,
        backendCode: errorCode,
      })
    }
  }

  // Handle network errors
  if (error instanceof Error) {
    if (
      error.message.includes("ECONNREFUSED") ||
      error.message.includes("fetch failed")
    ) {
      return new ExternalServiceError(
        "backend-api",
        "Backend service unavailable",
        {
          operation,
          originalError: error.message,
        },
      )
    }

    return new ExternalServiceError("backend-api", error.message, {
      operation,
    })
  }

  // Fallback error
  return new ExternalServiceError("backend-api", "Unknown backend error", {
    operation,
    error: String(error),
  })
}

/**
 * Wrap async function with error handling
 * Catches errors, logs them, and transforms them appropriately
 *
 * @param fn - Async function to wrap
 * @param operation - Name of the operation (for logging)
 * @returns Wrapped function
 *
 * @example
 * export const $login = withErrorHandling(
 *   async (credentials: LoginRequest) => {
 *     return await fetchPost<AuthResponse>('/auth/login', credentials)
 *   },
 *   'login'
 * )
 */
export function withErrorHandling<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  operation: string,
): T {
  return (async (...args: Parameters<T>): Promise<ReturnType<T>> => {
    try {
      return await fn(...args)
    } catch (error) {
      // Transform and re-throw
      throw transformBackendError(error, operation)
    }
  }) as T
}

/**
 * Safe async wrapper that never throws
 * Returns [error, null] or [null, data] tuple
 *
 * @param promise - Promise to execute
 * @returns Tuple of [error, data]
 *
 * @example
 * const [error, user] = await safeAsync(loginUser(credentials))
 * if (error) {
 *   // Handle error
 * }
 * // Use user
 */
export async function safeAsync<T>(
  promise: Promise<T>,
): Promise<[AppError, null] | [null, T]> {
  try {
    const data = await promise
    return [null, data]
  } catch (error) {
    if (isAppError(error)) {
      return [error, null]
    }
    return [
      new AppError(
        error instanceof Error ? error.message : "Unknown error",
        APIErrorCode.UnknownError,
        500,
      ),
      null,
    ]
  }
}

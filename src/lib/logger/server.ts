import "server-only"
import pino from "pino"
import { isDebugEnabled, isDevelopment } from "@/constants/env"

/**
 * Logger configuration based on environment
 */
const isLoggingEnabled = isDevelopment || isDebugEnabled

// Log level: debug in dev, info if DEBUG=true, error otherwise (production default)
const logLevel =
  process.env.LOG_LEVEL ||
  (isDevelopment ? "debug" : isDebugEnabled ? "info" : "error")

/**
 * Base logger instance
 *
 * Logging behavior:
 * - Development (NODE_ENV=development): All logs enabled (debug level)
 * - Production with DEBUG=true: Info level and above
 * - Production without DEBUG: Only errors (error level)
 *
 * Note: We don't use pino-pretty transport in Next.js because it relies on
 * worker threads which don't work in serverless/edge environments.
 */
export const logger = pino({
  level: logLevel,
  // Base configuration
  base: {
    env: process.env.NODE_ENV,
    app: "areamedica-manager-ui",
  },
  // Custom serializers for better error logging
  serializers: {
    err: pino.stdSerializers.err,
    error: pino.stdSerializers.err,
    req: pino.stdSerializers.req,
    res: pino.stdSerializers.res,
  },
  // Add timestamp
  timestamp: pino.stdTimeFunctions.isoTime,
  // Format output
  formatters: {
    level: (label) => {
      return { level: label.toUpperCase() }
    },
    // Pretty format in development without worker threads
    ...(isLoggingEnabled && {
      log: (object) => {
        // Format logs in a more readable way for development
        const { level, time, msg, ...rest } = object
        return {
          level,
          time,
          msg,
          ...rest,
        }
      },
    }),
  },
  // Browser-like output when logging is enabled
  browser: {
    asObject: isLoggingEnabled,
  },
})

/**
 * Create a child logger with additional context
 *
 * @param context - Additional context to include in all logs
 * @returns Child logger instance
 *
 * @example
 * const authLogger = createLogger({ service: 'auth' })
 * authLogger.info('User logged in', { userId: '123' })
 */
export function createLogger(context: Record<string, unknown>) {
  return logger.child(context)
}

/**
 * Log an error with full context
 *
 * @param error - Error object
 * @param context - Additional context about where/why the error occurred
 * @param message - Optional custom message
 *
 * @example
 * try {
 *   await riskyOperation()
 * } catch (error) {
 *   logError(error, {
 *     operation: 'login',
 *     userId: '123',
 *     endpoint: '/api/auth/login'
 *   }, 'Login failed')
 * }
 */
export function logError(
  error: unknown,
  context: Record<string, unknown> = {},
  message?: string,
) {
  const errorMessage = message || "An error occurred"

  if (error instanceof Error) {
    logger.error(
      {
        err: error,
        stack: error.stack,
        ...context,
      },
      errorMessage,
    )
  } else {
    logger.error(
      {
        error: String(error),
        ...context,
      },
      errorMessage,
    )
  }
}

/**
 * Log a warning with context
 *
 * @param message - Warning message
 * @param context - Additional context
 *
 * @example
 * logWarning('Token near expiration', {
 *   userId: '123',
 *   expiresIn: 300
 * })
 */
export function logWarning(
  message: string,
  context: Record<string, unknown> = {},
) {
  logger.warn(context, message)
}

/**
 * Log info message with context
 *
 * @param message - Info message
 * @param context - Additional context
 *
 * @example
 * logInfo('User authenticated successfully', {
 *   userId: '123',
 *   method: 'email'
 * })
 */
export function logInfo(
  message: string,
  context: Record<string, unknown> = {},
) {
  logger.info(context, message)
}

/**
 * Log debug message (only in development or when LOG_LEVEL=debug)
 *
 * @param message - Debug message
 * @param context - Additional context
 *
 * @example
 * logDebug('Processing request', {
 *   headers: req.headers,
 *   body: req.body
 * })
 */
export function logDebug(
  message: string,
  context: Record<string, unknown> = {},
) {
  logger.debug(context, message)
}

/**
 * Create a performance timer for measuring operation duration
 *
 * @param operation - Name of the operation being timed
 * @param context - Additional context
 * @returns Function to call when operation completes
 *
 * @example
 * const endTimer = startTimer('database-query', { table: 'users' })
 * const result = await db.query()
 * endTimer() // Logs duration automatically
 */
export function startTimer(
  operation: string,
  context: Record<string, unknown> = {},
) {
  const startTime = Date.now()

  return (additionalContext: Record<string, unknown> = {}) => {
    const duration = Date.now() - startTime
    logger.info(
      {
        operation,
        duration,
        ...context,
        ...additionalContext,
      },
      `Operation completed: ${operation}`,
    )
  }
}

/**
 * Log HTTP request
 *
 * @param method - HTTP method
 * @param url - Request URL
 * @param context - Additional context (status, duration, etc.)
 *
 * @example
 * logRequest('POST', '/api/auth/login', {
 *   status: 200,
 *   duration: 150,
 *   userId: '123'
 * })
 */
export function logRequest(
  method: string,
  url: string,
  context: Record<string, unknown> = {},
) {
  logger.info(
    {
      type: "http-request",
      method,
      url,
      ...context,
    },
    `${method} ${url}`,
  )
}

/**
 * Authentication Service (Server-Side)
 *
 * This module provides server-side authentication functions with:
 * - Structured error handling and logging
 * - Automatic error transformation
 * - Request context tracking
 *
 * @module services/auth.server
 */

import { apiRoutes } from "@/constants/api-routes"
import { transformBackendError } from "@/lib/errors/errorHandler"
import { fetchPost } from "@/lib/fetch/server"
import { logError } from "@/lib/logger/server"
import type { AuthResponse, LoginRequest } from "@/types/auth"

/**
 * Authenticates a user with email and password
 *
 * Calls the backend `/auth/login` endpoint and returns authentication tokens.
 * This function should be called from API routes or Server Actions only.
 *
 * Features:
 * - Automatic error transformation and logging
 * - Performance timing
 * - Structured logging with context
 *
 * @param loginRequest - User credentials containing email and password
 * @returns Promise resolving to AuthResponse with access_token, refresh_token, and expiration
 *
 * @throws {AuthenticationError} When credentials are invalid
 * @throws {ExternalServiceError} When backend is unreachable
 *
 * @example
 * try {
 *   const response = await $login({ email, password })
 *   // Handle successful login
 * } catch (error) {
 *   if (error instanceof AuthenticationError) {
 *     // Handle invalid credentials
 *   }
 * }
 *
 * @see {@link AuthResponse} for response structure
 * @see {@link LoginRequest} for request parameters
 */
export async function $login(
  loginRequest: LoginRequest,
): Promise<AuthResponse> {
  try {
    return await fetchPost<AuthResponse>(apiRoutes.login, loginRequest)
  } catch (error) {
    // Transform backend error with context
    const appError = transformBackendError(error, "login")

    logError(
      {
        err: appError,
        email: loginRequest.email,
        operation: "login",
        errorCode: appError.code,
      },
      {
        service: "$login",
      },
      "Login failed",
    )

    throw appError
  }
}

/**
 * Refreshes authentication tokens using a refresh token
 *
 * Calls the backend `/auth/refresh` endpoint to get new access and refresh tokens.
 * The refresh token should be read from an HTTP-only cookie for security.
 *
 * Features:
 * - Token rotation support
 * - Automatic error handling
 * - Performance monitoring
 *
 * Token Rotation:
 * - Backend returns both new access_token AND new refresh_token
 * - Always update both tokens after successful refresh
 * - Old refresh token becomes invalid after use
 *
 * @param refreshToken - The current refresh token (from HTTP-only cookie)
 * @returns Promise resolving to AuthResponse with new tokens
 *
 * @throws {AuthenticationError} When refresh token is invalid or expired
 * @throws {ExternalServiceError} When backend is unreachable
 *
 * @example
 * try {
 *   const response = await $refreshTokens(refreshToken)
 *   // Update cookies with new tokens
 * } catch (error) {
 *   // Clear invalid tokens and redirect to login
 * }
 *
 * @see {@link AuthResponse} for response structure
 */
export async function $refreshTokens(
  refreshToken: string,
): Promise<AuthResponse> {
  try {
    const response = await fetchPost<AuthResponse>(apiRoutes.refresh, {
      refresh_token: refreshToken,
    })

    return response
  } catch (error) {
    const appError = transformBackendError(error, "refresh-tokens")

    logError(
      {
        err: appError,
        operation: "refresh-tokens",
        errorCode: appError.code,
      },
      {
        service: "$refreshTokens",
      },
      "Token refresh failed",
    )

    throw appError
  }
}

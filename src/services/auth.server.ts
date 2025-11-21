import { apiRoutes } from "@/constants/api-routes"
import { fetchPost } from "@/lib/fetch/server"
import type { AuthResponse, LoginRequest } from "@/types/auth"

/**
 * Authenticates a user with email and password
 *
 * Calls the backend `/auth/login` endpoint and returns authentication tokens.
 * This function should be called from API routes or Server Actions only.
 *
 * @param loginRequest - User credentials containing email and password
 * @returns Promise resolving to AuthResponse with access_token, refresh_token, and expiration
 *
 * @throws {APIError} When credentials are invalid or backend is unreachable
 * - Status 400: Invalid request format
 * - Status 401: Invalid credentials
 * - Status 500: Server error
 *
 * @see {@link AuthResponse} for response structure
 * @see {@link LoginRequest} for request parameters
 */
export async function $login(loginRequest: LoginRequest) {
  return await fetchPost<AuthResponse>(apiRoutes.login, loginRequest)
}

/**
 * Refreshes authentication tokens using a refresh token
 *
 * Calls the backend `/auth/refresh` endpoint to get new access and refresh tokens.
 * The refresh token should be read from an HTTP-only cookie for security.
 *
 * Token Rotation:
 * - Backend returns both new access_token AND new refresh_token
 * - Always update both tokens after successful refresh
 * - Old refresh token becomes invalid after use
 *
 * @param refreshToken - The current refresh token (from HTTP-only cookie)
 * @returns Promise resolving to AuthResponse with new tokens
 *
 * @throws {APIError} When refresh token is invalid or expired
 * - Status 401: Invalid or expired refresh token
 * - Status 500: Server error
 *
 * @see {@link AuthResponse} for response structure
 * @see {@link AUTH_REFRESH_TOKEN_COOKIE} for cookie name constant
 */
export async function $refreshTokens(refreshToken: string) {
  return await fetchPost<AuthResponse>(apiRoutes.refresh, {
    refresh_token: refreshToken,
  })
}

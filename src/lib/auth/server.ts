"use server"

import { apiRoutes } from "@/constants/api-routes"
import { fetchGet } from "@/lib/fetch/server"
import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
} from "@/lib/tokens/server"
import { $refreshTokens } from "@/services/auth.server"
import type { APIError } from "@/types/api"
import type { User } from "@/types/user"

/**
 * Get the current authenticated user from server-side session
 * Reads access token from cookie and validates it with the backend
 *
 * If the access token is expired (401), attempts to refresh it using the refresh token
 * and retries the request once before failing.
 *
 * @returns User object if authenticated, null otherwise
 */
export async function $getServerSession(): Promise<User | null> {
  try {
    // Get access token from server-side cookie
    const token = await getAccessToken()

    if (!token) {
      return null
    }

    // Try to fetch current user from backend
    return await fetchGet<User>(apiRoutes.userInfo, { token })
  } catch (error) {
    // Check if error is a 401 (token expired)
    const apiError = error as APIError

    if (apiError.status === 401) {
      // Try to refresh the token
      try {
        const refreshToken = await getRefreshToken()

        if (!refreshToken) {
          // No refresh token available
          return null
        }

        // Call refresh endpoint
        const { refresh_token, access_token, expires_in } =
          await $refreshTokens(refreshToken)

        // Update refresh token cookie
        await setRefreshToken(refresh_token)
        // Update access token cookie
        await setAccessToken(access_token, {
          maxAge: expires_in,
        })

        // Retry fetching user with new token
        return await fetchGet<User>(apiRoutes.userInfo, { token: access_token })
      } catch (refreshError) {
        // Token refresh failed, user needs to re-authenticate
        console.error("Token refresh failed:", refreshError)
        return null
      }
    }

    // Log other errors for debugging
    console.error("Server session error:", error)

    // Return null if the token is invalid or user fetch fails
    return null
  }
}

/**
 * Check if user is authenticated without redirecting
 * Useful for conditional rendering in Server Components
 *
 * @returns True if user is authenticated, false otherwise
 *
 * @example
 * ```tsx
 * export default async function Page() {
 *   const isAuthenticated = await isAuth();
 *
 *   if (!isAuthenticated) {
 *     return <LoginPrompt />;
 *   }
 *
 *   return <ProtectedContent />;
 * }
 * ```
 */
export async function $isAuthenticated(): Promise<boolean> {
  const user = await $getServerSession()
  return user !== null
}

"use server"

import { apiRoutes } from "@/constants/api-routes"
import { fetchGet } from "@/lib/fetch/server"
import { getAccessToken } from "@/lib/tokens/server"
import type { User } from "@/types/user"

/**
 * Get the current authenticated user from server-side session
 * Reads access token from cookie and validates it with the backend
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

    // Fetch current user from backend
    return await fetchGet<User>(apiRoutes.userInfo, { token })
  } catch (error) {
    // Log error for debugging
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

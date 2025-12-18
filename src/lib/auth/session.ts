"use server"

import type { User } from "@/types/user"
import { auth } from "../../../auth"

/**
 * Get the current authenticated user from Auth.js session
 * Server-side only
 *
 * @returns User object if authenticated, null otherwise
 */
export async function getServerSession(): Promise<User | null> {
  const session = await auth()

  // If refresh token error occurred, user needs to re-authenticate
  if (session?.error === "RefreshAccessTokenError") {
    return null
  }

  return session?.user || null
}

/**
 * Check if user is authenticated
 * Server-side only
 *
 * @returns True if user is authenticated, false otherwise
 */
export async function isAuthenticated(): Promise<boolean> {
  const user = await getServerSession()
  return user !== null
}

/**
 * Get access token from Auth.js session
 * Server-side only
 * Useful for making API calls to backend from server components
 *
 * @returns Access token if authenticated, null otherwise
 */
export async function getAccessToken(): Promise<string | null> {
  const session = await auth()

  // If refresh token error occurred, token is invalid
  if (session?.error === "RefreshAccessTokenError") {
    return null
  }

  return session?.accessToken || null
}

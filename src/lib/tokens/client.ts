/**
 * Token Manager
 * Handles storage and retrieval of access tokens
 *
 * Strategy:
 * - Access token: Stored in localStorage (client-side only)
 * - Refresh token: Stored in HTTP-only cookie (handled by server)
 */

import {
  AUTH_ACCESS_TOKEN_KEY,
  AuthLocalStorage,
} from "@/constants/local-storage"

/**
 * Get the current access token from localStorage
 */
export function getAccessToken(): string | null {
  if (typeof window === "undefined") {
    return null
  }
  return AuthLocalStorage.getItem(AUTH_ACCESS_TOKEN_KEY)
}

/**
 * Store a new access token in localStorage
 */
export function setAccessToken(token: string): void {
  if (typeof window === "undefined") {
    return
  }
  AuthLocalStorage.setItem(AUTH_ACCESS_TOKEN_KEY, token)
}

/**
 * Remove the access token from localStorage
 */
export function removeAccessToken(): void {
  if (typeof window === "undefined") {
    return
  }
  AuthLocalStorage.removeItem(AUTH_ACCESS_TOKEN_KEY)
}

/**
 * Check if there's a valid access token
 */
export function hasAccessToken(): boolean {
  return AuthLocalStorage.hasItem(AUTH_ACCESS_TOKEN_KEY)
}

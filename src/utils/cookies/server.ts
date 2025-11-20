import { cookies } from "next/headers"
import { isProduction } from "@/constants/env"

export interface ServerCookieOptions {
  /** Number of seconds until the cookie expires */
  maxAge?: number
  /** Expiration date */
  expires?: Date
  /** Cookie path (default: '/') */
  path?: string
  /** Cookie domain */
  domain?: string
  /** Secure flag (HTTPS only) */
  secure?: boolean
  /** HttpOnly flag (not accessible via JavaScript) */
  httpOnly?: boolean
  /** SameSite attribute */
  sameSite?: "strict" | "lax" | "none"
}

/**
 * Get a cookie value
 * @param key - The cookie name
 * @returns The cookie value or null if not found
 */
export async function getCookie(key: string): Promise<string | null> {
  try {
    const cookieStore = await cookies()
    const cookie = cookieStore.get(key)
    return cookie?.value ?? null
  } catch (error) {
    console.error(`Error getting cookie (${key}):`, error)
    return null
  }
}

/**
 * Set a cookie with secure defaults
 * @param key - The cookie name
 * @param value - The cookie value
 * @param options - Cookie options
 * @returns true if successful, false otherwise
 *
 * Security defaults:
 * - Production: secure=true, httpOnly=true, sameSite=lax
 * - Development: secure=false, httpOnly=true, sameSite=lax
 */
export async function setCookie(
  key: string,
  value: string,
  options: ServerCookieOptions = {},
): Promise<boolean> {
  try {
    const cookieStore = await cookies()
    cookieStore.set(key, value, {
      path: options.path ?? "/",
      maxAge: options.maxAge,
      expires: options.expires,
      domain: options.domain,
      secure: options.secure ?? isProduction,
      httpOnly: options.httpOnly ?? true,
      sameSite: options.sameSite ?? "lax",
    })
    return true
  } catch (error) {
    console.error(`Error setting cookie (${key}):`, error)
    return false
  }
}

/**
 * Remove a cookie
 * @param key - The cookie name
 * @returns true if successful, false otherwise
 */
export async function removeCookie(key: string): Promise<boolean> {
  try {
    const cookieStore = await cookies()
    cookieStore.delete(key)
    return true
  } catch (error) {
    console.error(`Error removing cookie (${key}):`, error)
    return false
  }
}

/**
 * Check if a cookie exists
 * @param key - The cookie name
 * @returns true if the cookie exists, false otherwise
 */
export async function hasCookie(key: string): Promise<boolean> {
  try {
    const cookieStore = await cookies()
    return cookieStore.has(key)
  } catch (error) {
    console.error(`Error checking cookie (${key}):`, error)
    return false
  }
}

import {
  AUTH_ACCESS_TOKEN_COOKIE,
  AUTH_REFRESH_TOKEN_COOKIE,
  AUTH_REFRESH_TOKEN_COOKIE_DURATION,
} from "@/constants/cookies"
import {
  getCookie,
  removeCookie,
  type ServerCookieOptions,
  setCookie,
} from "@/utils/cookies/server"

/**
 * Get access token from cookies
 */
export async function getAccessToken(): Promise<string | null> {
  return await getCookie(AUTH_ACCESS_TOKEN_COOKIE)
}

/**
 * Set access token in cookies
 */
export async function setAccessToken(
  token: string,
  options?: ServerCookieOptions,
): Promise<boolean> {
  return await setCookie(AUTH_ACCESS_TOKEN_COOKIE, token, options)
}

/**
 * Removes access token from cookies
 */
export async function removeAccessToken(): Promise<void> {
  await removeCookie(AUTH_ACCESS_TOKEN_COOKIE)
}

/**
 * Get refresh token from cookies
 */
export async function getRefreshToken(): Promise<string | null> {
  return await getCookie(AUTH_REFRESH_TOKEN_COOKIE)
}

/**
 * Set refresh token in cookies
 */
export async function setRefreshToken(
  token: string,
  options?: ServerCookieOptions,
): Promise<boolean> {
  return await setCookie(AUTH_REFRESH_TOKEN_COOKIE, token, {
    ...options,
    maxAge: AUTH_REFRESH_TOKEN_COOKIE_DURATION,
  })
}

/**
 * Removes refresh token from cookies
 */
export async function removeRefreshToken(): Promise<void> {
  await removeCookie(AUTH_REFRESH_TOKEN_COOKIE)
}

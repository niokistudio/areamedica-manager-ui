import { NextResponse } from "next/server"
import {
  AUTH_ACCESS_TOKEN_COOKIE,
  AUTH_REFRESH_TOKEN_COOKIE,
  AUTH_REFRESH_TOKEN_COOKIE_DURATION,
} from "@/constants/cookies"
import { AuthenticationError } from "@/lib/errors/AppError"
import { handleAPIError } from "@/lib/errors/errorHandler"
import { $refreshTokens } from "@/services/auth.server"
import { getCookie, removeCookie, setCookie } from "@/utils/cookies/server"

/**
 * POST /api/auth/refresh
 * Refreshes access token using refresh token from HTTP-only cookie
 */
export async function POST() {
  try {
    // Get refresh token from cookie
    const refreshToken = await getCookie(AUTH_REFRESH_TOKEN_COOKIE)

    if (!refreshToken) {
      throw new AuthenticationError("No refresh token found")
    }

    // Call backend refresh service
    const response = await $refreshTokens(refreshToken)

    // Update refresh token cookie with new token
    await setCookie(AUTH_REFRESH_TOKEN_COOKIE, response.refresh_token, {
      maxAge: AUTH_REFRESH_TOKEN_COOKIE_DURATION,
    })

    // Update access token cookie
    await setCookie(AUTH_ACCESS_TOKEN_COOKIE, response.access_token, {
      maxAge: response.expires_in,
    })

    // Return new access token to the client
    return NextResponse.json({
      access_token: response.access_token,
      token_type: response.token_type,
      expires_in: response.expires_in,
    })
  } catch (error) {
    // Clear invalid tokens on refresh failure
    await removeCookie(AUTH_REFRESH_TOKEN_COOKIE)
    await removeCookie(AUTH_ACCESS_TOKEN_COOKIE)

    // Handle and log error with context
    return handleAPIError(error, {
      endpoint: "/api/auth/refresh",
      method: "POST",
    })
  }
}

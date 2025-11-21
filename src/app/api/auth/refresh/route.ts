import { NextResponse } from "next/server"
import {
  AUTH_ACCESS_TOKEN_COOKIE,
  AUTH_REFRESH_TOKEN_COOKIE,
  AUTH_REFRESH_TOKEN_COOKIE_DURATION,
} from "@/constants/cookies"
import { $refreshTokens } from "@/services/auth.server"
import { type APIError, APIErrorCode } from "@/types/api"
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
      return NextResponse.json(
        {
          message: "No refresh token found",
          code: APIErrorCode.InvalidCredentials,
          status: 401,
        } as APIError,
        { status: 401 },
      )
    }

    // Call backend refresh endpoint
    const response = await $refreshTokens(refreshToken)

    // Update refresh token cookie
    await setCookie(AUTH_REFRESH_TOKEN_COOKIE, response.refresh_token, {
      maxAge: AUTH_REFRESH_TOKEN_COOKIE_DURATION,
    })

    // Update access token cookie
    await setCookie(AUTH_ACCESS_TOKEN_COOKIE, response.access_token, {
      maxAge: response.expires_in,
    })

    // Return a new access token to the client
    return NextResponse.json({
      access_token: response.access_token,
      token_type: response.token_type,
      expires_in: response.expires_in,
    })
  } catch (error) {
    console.error("Token refresh error:", error)

    // Clear cookies on error
    await removeCookie(AUTH_REFRESH_TOKEN_COOKIE)
    await removeCookie(AUTH_ACCESS_TOKEN_COOKIE)

    return NextResponse.json(
      {
        message: "An unexpected error occurred during token refresh",
        code: APIErrorCode.UnknownError,
        status: 500,
      } as APIError,
      { status: 500 },
    )
  }
}

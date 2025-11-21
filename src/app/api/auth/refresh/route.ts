import { NextResponse } from "next/server"
import { AuthenticationError } from "@/lib/errors/AppError"
import { handleAPIError } from "@/lib/errors/errorHandler"
import {
  getRefreshToken,
  removeAccessToken,
  removeRefreshToken,
  setAccessToken,
  setRefreshToken,
} from "@/lib/tokens/server"
import { $refreshTokens } from "@/services/auth.server"

/**
 * POST /api/auth/refresh
 * Refreshes access token using refresh token from HTTP-only cookie
 */
export async function POST() {
  try {
    // Get refresh token from cookie
    const refreshToken = await getRefreshToken()

    if (!refreshToken) {
      throw new AuthenticationError("No refresh token found")
    }

    // Call backend refresh service
    const response = await $refreshTokens(refreshToken)

    // Update refresh token cookie with new token
    await setRefreshToken(response.refresh_token)

    // Update access token cookie
    await setAccessToken(response.access_token, {
      maxAge: response.expires_in,
    })

    // Return a new access token to the client
    return NextResponse.json({
      access_token: response.access_token,
      token_type: response.token_type,
      expires_in: response.expires_in,
    })
  } catch (error) {
    // Clear invalid tokens on refresh failure
    await removeRefreshToken()
    await removeAccessToken()

    // Handle and log error with context
    return handleAPIError(error, {
      endpoint: "/api/auth/refresh",
      method: "POST",
    })
  }
}

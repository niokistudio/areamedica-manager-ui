import { NextResponse } from "next/server"
import {
  AUTH_ACCESS_TOKEN_COOKIE,
  AUTH_REFRESH_TOKEN_COOKIE,
} from "@/constants/cookies"
import { handleAPIError } from "@/lib/errors/errorHandler"
import { removeCookie } from "@/utils/cookies/server"

/**
 * POST /api/auth/logout
 * Clears refresh token and access token cookies
 */
export async function POST() {
  try {
    // Clear refresh token cookie
    await removeCookie(AUTH_REFRESH_TOKEN_COOKIE)

    // Clear access token cookie
    await removeCookie(AUTH_ACCESS_TOKEN_COOKIE)

    // Return success response
    return NextResponse.json(null, { status: 203 })
  } catch (error) {
    // Handle and log error with context
    return handleAPIError(error, {
      endpoint: "/api/auth/logout",
      method: "POST",
    })
  }
}

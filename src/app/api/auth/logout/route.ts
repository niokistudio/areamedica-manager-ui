import { NextResponse } from "next/server"
import {
  AUTH_ACCESS_TOKEN_COOKIE,
  AUTH_REFRESH_TOKEN_COOKIE,
} from "@/constants/cookies"
import { type APIError, APIErrorCode } from "@/types/api"
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
    return NextResponse.json({
      message: "Logged out successfully",
    })
  } catch (error) {
    console.error("Logout error:", error)

    return NextResponse.json(
      {
        message: "An error occurred during logout",
        code: APIErrorCode.UnknownError,
        status: 500,
      } as APIError,
      { status: 500 },
    )
  }
}

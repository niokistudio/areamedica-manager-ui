import { NextResponse } from "next/server"
import { handleAPIError } from "@/lib/errors/errorHandler"
import { removeAccessToken, removeRefreshToken } from "@/lib/tokens/server"

/**
 * POST /api/auth/logout
 * Clears refresh token and access token cookies
 */
export async function POST() {
  try {
    // Clear refresh token cookie
    await removeRefreshToken()

    // Clear access token cookie
    await removeAccessToken()

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

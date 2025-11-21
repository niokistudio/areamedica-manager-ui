import { type NextRequest, NextResponse } from "next/server"
import { LoginRequestSchema } from "@/app/api/auth/login/login.schema"
import {
  AUTH_ACCESS_TOKEN_COOKIE,
  AUTH_REFRESH_TOKEN_COOKIE,
  AUTH_REFRESH_TOKEN_COOKIE_DURATION,
} from "@/constants/cookies"
import { $login } from "@/services/auth.server"
import { type APIError, APIErrorCode } from "@/types/api"
import { setCookie } from "@/utils/cookies/server"

/**
 * POST /api/auth/login
 * Authenticates user and sets refresh token cookie
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { data: loginRequest, success } = LoginRequestSchema.safeParse(body)

    if (!success) {
      return NextResponse.json(
        {
          message: "Invalid credentials",
          code: APIErrorCode.InvalidCredentials,
          status: 400,
        } as APIError,
        { status: 400 },
      )
    }

    // Call backend login endpoint
    const response = await $login(loginRequest)

    // Store refresh token in an HTTP-only cookie
    await setCookie(AUTH_REFRESH_TOKEN_COOKIE, response.refresh_token, {
      maxAge: AUTH_REFRESH_TOKEN_COOKIE_DURATION,
    })

    // Also store access token in cookie for server-side access
    await setCookie(AUTH_ACCESS_TOKEN_COOKIE, response.access_token, {
      maxAge: response.expires_in,
    })

    // Return the access token to the client
    return NextResponse.json({
      access_token: response.access_token,
      token_type: response.token_type,
      expires_in: response.expires_in,
    })
  } catch (error) {
    console.error("Login error:", error)

    return NextResponse.json(
      {
        message: "An unexpected error occurred during login",
        code: APIErrorCode.UnknownError,
        status: 500,
      } as APIError,
      { status: 500 },
    )
  }
}

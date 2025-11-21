import { type NextRequest, NextResponse } from "next/server"
import { LoginRequestSchema } from "@/app/api/auth/login/login.schema"
import {
  AUTH_ACCESS_TOKEN_COOKIE,
  AUTH_REFRESH_TOKEN_COOKIE,
  AUTH_REFRESH_TOKEN_COOKIE_DURATION,
} from "@/constants/cookies"
import { ValidationError } from "@/lib/errors/AppError"
import { handleAPIError } from "@/lib/errors/errorHandler"
import { $login } from "@/services/auth.server"
import { setCookie } from "@/utils/cookies/server"

/**
 * POST /api/auth/login
 * Authenticates user and sets authentication cookies
 */
export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json()
    const {
      data: loginRequest,
      success,
      error,
    } = LoginRequestSchema.safeParse(body)

    if (!success) {
      throw new ValidationError("Invalid login credentials format", {
        validationErrors: error,
      })
    }

    // Call backend login service
    const response = await $login(loginRequest)

    // Store refresh token in an HTTP-only cookie
    await setCookie(AUTH_REFRESH_TOKEN_COOKIE, response.refresh_token, {
      maxAge: AUTH_REFRESH_TOKEN_COOKIE_DURATION,
    })

    // Store access token in a cookie for server-side access
    await setCookie(AUTH_ACCESS_TOKEN_COOKIE, response.access_token, {
      maxAge: response.expires_in,
    })

    // Return an access token to a client (for localStorage)
    return NextResponse.json({
      access_token: response.access_token,
      token_type: response.token_type,
      expires_in: response.expires_in,
    })
  } catch (error) {
    // Handle and log error with context
    return handleAPIError(error, {
      endpoint: "/api/auth/login",
      method: "POST",
    })
  }
}

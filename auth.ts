import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { email, object, string } from "zod"
import { apiRoutes } from "@/constants/api-routes"
import type { AuthResponse } from "@/types/auth"
import type { User } from "@/types/user"
import { authConfig } from "./auth.config"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || ""

/**
 * Login schema validation
 */
const loginSchema = object({
  email: email(),
  password: string().min(1),
})

/**
 * Call backend /auth/login endpoint
 */
async function loginBackend(
  email: string,
  password: string,
): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE_URL}${apiRoutes.login}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || "Login failed")
  }

  return response.json()
}

/**
 * Fetch user info from backend /auth/me endpoint
 */
async function fetchUserInfo(accessToken: string): Promise<User> {
  const response = await fetch(`${API_BASE_URL}${apiRoutes.userInfo}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  })

  if (!response.ok) {
    throw new Error("Failed to fetch user info")
  }

  return response.json()
}

/**
 * Refresh access token using refresh token
 */
async function refreshAccessToken(refreshToken: string): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE_URL}${apiRoutes.refresh}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh_token: refreshToken }),
  })

  if (!response.ok) {
    throw new Error("Token refresh failed")
  }

  return response.json()
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          // Validate credentials
          const { email, password } = loginSchema.parse(credentials)

          // Call backend login
          const authResponse = await loginBackend(email, password)

          // Fetch user info
          const user = await fetchUserInfo(authResponse.access_token)

          // Return user + tokens (stored in JWT)
          return {
            ...user,
            accessToken: authResponse.access_token,
            refreshToken: authResponse.refresh_token,
            accessTokenExpires: Date.now() + authResponse.expires_in * 1000,
          } as any
        } catch (error) {
          console.error("Authorization error:", error)
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      // Initial sign in
      if (account && user) {
        // Cast user to any since it contains our custom properties from authorize()
        const customUser = user as any
        return {
          user: {
            id: customUser.id,
            email: customUser.email,
            full_name: customUser.full_name,
            phone: customUser.phone,
            national_id: customUser.national_id,
            is_active: customUser.is_active,
            is_verified: customUser.is_verified,
            permissions: customUser.permissions,
            created_at: customUser.created_at,
            updated_at: customUser.updated_at,
          } as User,
          accessToken: customUser.accessToken,
          refreshToken: customUser.refreshToken,
          accessTokenExpires: customUser.accessTokenExpires,
        }
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < (token.accessTokenExpires || 0)) {
        return token
      }

      // Access token has expired, try to refresh it
      try {
        const refreshedTokens = await refreshAccessToken(token.refreshToken)

        return {
          ...token,
          accessToken: refreshedTokens.access_token,
          refreshToken: refreshedTokens.refresh_token,
          accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
        }
      } catch (error) {
        console.error("Token refresh error:", error)
        return {
          ...token,
          error: "RefreshAccessTokenError" as const,
        }
      }
    },
    async session({ session, token }) {
      if (token.error) {
        session.error = token.error
      }

      session.user = token.user as any
      session.accessToken = token.accessToken

      return session
    },
  },
})

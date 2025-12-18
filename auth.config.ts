import type { NextAuthConfig } from "next-auth"
import type { User } from "@/types/user"

/**
 * Auth.js configuration
 * This file can be imported in middleware (edge runtime)
 * and auth.ts (Node runtime)
 */
export const authConfig = {
  // Session configuration
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days (match refresh token duration)
  },

  // Pages configuration
  pages: {
    signIn: "/login",
    error: "/login", // Redirect errors to login page
  },

  // Callbacks
  callbacks: {
    // Control access to pages
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isAuthPage = nextUrl.pathname.startsWith("/login")
      const isProtectedPage = nextUrl.pathname.startsWith("/transactions")

      if (isProtectedPage) {
        return isLoggedIn
      }
      if (isAuthPage) {
        if (isLoggedIn)
          return Response.redirect(new URL("/transactions", nextUrl))
        return true
      }
      return true
    },
  },

  // Providers (defined in auth.ts to avoid edge runtime issues)
  providers: [],
} satisfies NextAuthConfig

// Type augmentation for a session
declare module "next-auth" {
  interface Session {
    user: User
    accessToken: string
    error?: "RefreshAccessTokenError"
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    user: User
    accessToken: string
    refreshToken: string
    accessTokenExpires: number
    error?: "RefreshAccessTokenError"
  }
}

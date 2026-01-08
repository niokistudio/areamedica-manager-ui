import { NextResponse } from "next/server"
import { routes } from "@/constants/routes"
import { auth } from "./auth"

/**
 * Routes that require authentication
 */
const protectedRoutes = [routes.transactions]

/**
 * Routes that are only accessible to unauthenticated users (guest routes)
 */
const guestRoutes = [routes.login]

/**
 * Default redirect for authenticated users trying to access guest routes
 */
const DEFAULT_AUTHENTICATED_REDIRECT = routes.transactions

export default auth((request) => {
  const isLoggedIn = !!request.auth
  const { pathname } = request.nextUrl

  // Check if the current route is protected
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  )

  // Redirect unauthenticated users from protected routes to login
  if (isProtectedRoute && !isLoggedIn) {
    const loginUrl = new URL(routes.login, request.url)
    loginUrl.searchParams.set("redirect", pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Check if the current route is a guest-only route
  const isGuestRoute = guestRoutes.some((route) => pathname.startsWith(route))

  // Redirect authenticated users away from guest routes
  if (isGuestRoute && isLoggedIn) {
    return NextResponse.redirect(
      new URL(DEFAULT_AUTHENTICATED_REDIRECT, request.url),
    )
  }

  return NextResponse.next()
})

export const config = {
  /**
   * Middleware matcher configuration
   * Applies middleware to all routes EXCEPT:
   * - /api/* - API routes (handled separately)
   * - /_next/static/* - Next.js static files (CSS, JS bundles)
   * - /_next/image/* - Next.js image optimization endpoint
   * - /favicon.ico - Favicon file
   *
   * The regex pattern uses negative lookahead (?!...) to exclude these paths
   * while matching everything else: /((?!excluded_patterns).*)/
   */
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}

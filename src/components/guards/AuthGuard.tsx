"use server"

import { redirect } from "next/navigation"
import type { ReactNode } from "react"
import { routes } from "@/constants/routes"
import { isAuthenticated } from "@/lib/auth/session"

interface AuthGuardProps {
  children: ReactNode
  redirectTo?: string
}

/**
 * Server-side authentication guard
 * Note: With Auth.js middleware, this provides an additional layer
 * of protection for specific components
 */
export async function AuthGuard({ children, redirectTo }: AuthGuardProps) {
  const isUserAuthenticated = await isAuthenticated()

  if (!isUserAuthenticated) {
    const loginUrl = redirectTo
      ? `${routes.login}?redirect=${encodeURIComponent(redirectTo)}`
      : routes.login
    return redirect(loginUrl)
  }

  return children
}

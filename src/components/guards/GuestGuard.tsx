"use server"

import { redirect } from "next/navigation"
import type { ReactNode } from "react"
import { routes } from "@/constants/routes"
import { isAuthenticated } from "@/lib/auth/session"

interface GuestGuardProps {
  children: ReactNode
}

/**
 * Server-side guest guard
 * Note: With Auth.js middleware, this provides an additional layer
 * of protection for specific components
 */
export async function GuestGuard({ children }: GuestGuardProps) {
  const isUserAuthenticated = await isAuthenticated()

  if (isUserAuthenticated) {
    return redirect(routes.transactions)
  }

  return children
}

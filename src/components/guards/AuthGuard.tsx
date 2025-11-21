"use server"

import { redirect } from "next/navigation"
import type { ReactNode } from "react"
import { routes } from "@/constants/routes"
import { $isAuthenticated } from "@/lib/auth/server"

interface AuthGuardProps {
  children: ReactNode
  redirectTo?: string
}

export async function AuthGuard({ children, redirectTo }: AuthGuardProps) {
  const isUserAuthenticated = await $isAuthenticated()
  const loginUrl = redirectTo
    ? `${routes.login}?redirect=${encodeURIComponent(redirectTo)}`
    : routes.login

  if (!isUserAuthenticated) {
    return redirect(loginUrl)
  }

  return children
}

"use client"

import { usePathname, useRouter } from "next/navigation"
import type { ReactNode } from "react"
import { useEffect } from "react"
import { routes } from "@/constants/routes"
import { useAuth } from "@/hooks/use-auth"

interface ClientAuthGuardProps {
  children: ReactNode
}

/**
 * Client-side authentication guard
 * Redirects unauthenticated users to login page
 * Monitors auth state changes and redirects accordingly
 */
export function ClientAuthGuard({ children }: ClientAuthGuardProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { isAuthenticated, isLoading } = useAuth()

  useEffect(() => {
    // Don't redirect while loading the initial auth state
    if (isLoading) {
      return
    }

    // If user is not authenticated, redirect to log in
    if (!isAuthenticated) {
      const loginUrl = `${routes.login}?redirect=${encodeURIComponent(pathname)}`
      router.push(loginUrl)
    }
  }, [isAuthenticated, isLoading, pathname, router])

  // Show nothing while loading or redirecting
  if (isLoading || !isAuthenticated) {
    return null
  }

  return children
}

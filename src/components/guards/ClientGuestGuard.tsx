"use client"

import { useRouter } from "next/navigation"
import type { ReactNode } from "react"
import { useEffect } from "react"
import { routes } from "@/constants/routes"
import { useAuth } from "@/hooks/use-auth"

interface ClientGuestGuardProps {
  children: ReactNode
}

/**
 * Client-side guest guard
 * Redirects authenticated users away from guest-only pages (like login)
 * Monitors auth state changes and redirects accordingly
 */
export function ClientGuestGuard({ children }: ClientGuestGuardProps) {
  const router = useRouter()
  const { isAuthenticated, isLoading } = useAuth()

  useEffect(() => {
    // Don't redirect while loading the initial auth state
    if (isLoading) {
      return
    }

    // If the user is authenticated, redirect to the transaction page
    if (isAuthenticated) {
      router.push(routes.transactions)
    }
  }, [isAuthenticated, isLoading, router])

  // Show nothing while loading or redirecting
  if (isLoading || isAuthenticated) {
    return null
  }

  return children
}

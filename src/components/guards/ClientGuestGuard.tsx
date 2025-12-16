"use client"

import { useRouter } from "next/navigation"
import { type ReactNode, useEffect, useState } from "react"
import { routes } from "@/constants/routes"
import { hasAccessToken } from "@/lib/tokens/client"

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
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    // Check if the user has an access token
    const isAuthenticated = hasAccessToken()

    if (isAuthenticated) {
      // If the user is authenticated, redirect to the transaction page
      router.push(routes.transactions)
    } else {
      // User is not authenticated, allow rendering
      setIsChecking(false)
    }
  }, [router])

  // Show nothing while checking authentication or redirecting
  if (isChecking) {
    return null
  }

  return children
}

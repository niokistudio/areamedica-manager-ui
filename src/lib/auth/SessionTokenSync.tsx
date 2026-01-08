"use client"

import { useSession } from "next-auth/react"
import { useEffect } from "react"
import { clearAccessToken, setAccessToken } from "./token-storage"

/**
 * Synchronizes the session access token to module-level storage.
 *
 * This component bridges React context (SessionProvider) and non-React code
 * (axios interceptors). It watches for session changes and updates the
 * module-level token storage, allowing the axios interceptor to access
 * the current token synchronously without calling getSession().
 *
 * Benefits:
 * - Eliminates duplicate network requests to session endpoint
 * - Provides synchronous token access for axios interceptors
 * - Automatically updates when SessionProvider refreshes the token
 * - Clears token on logout
 */
export function SessionTokenSync() {
  const { data: session } = useSession()

  useEffect(() => {
    if (session?.accessToken) {
      setAccessToken(session.accessToken)
    } else {
      clearAccessToken()
    }
  }, [session?.accessToken])

  // This component only syncs the state, renders nothing
  return null
}

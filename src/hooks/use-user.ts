"use client"

import { useSession } from "next-auth/react"
import type { User } from "@/types/user"

/**
 * Hook to get current user from Auth.js session
 * Client-side only
 *
 * @returns User object, loading state, and error
 */
export function useUser() {
  const { data: session, status } = useSession()

  return {
    data: session?.user as User | undefined,
    isLoading: status === "loading",
    error:
      session?.error === "RefreshAccessTokenError"
        ? { message: "Session expired", status: 401, code: "UNAUTHORIZED" }
        : undefined,
  }
}

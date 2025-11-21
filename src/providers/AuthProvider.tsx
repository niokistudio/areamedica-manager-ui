"use client"

import { useRouter } from "next/navigation"
import { createContext, type ReactNode, useCallback } from "react"
import { mutate } from "swr"
import { apiRoutes } from "@/constants/api-routes"
import { routes } from "@/constants/routes"
import { useUser } from "@/hooks/use-user"
import { removeAccessToken } from "@/lib/tokens/client"
import { loginUser, logoutUser } from "@/services/auth.client"
import type { APIError } from "@/types/api"
import type { LoginRequest } from "@/types/auth"
import type { User } from "@/types/user"

export interface AuthContextType {
  // State
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  error: APIError | null

  // Authentication methods
  login: (credentials: LoginRequest) => Promise<void>
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

/**
 * Authentication Provider Component
 * Wraps application with authentication context
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter()
  const { data: user, error, isLoading, mutate: mutateUser } = useUser()

  /**
   * Login user
   * Calls /api/auth/login, stores token, and fetches user data
   */
  const login = useCallback(
    async (loginRequest: LoginRequest) => {
      await loginUser(loginRequest)

      // Redirect to manager page
      router.push(routes.transactions)
    },
    [router],
  )

  /**
   * Logout user
   * Clears tokens and redirects to login
   */
  const logout = useCallback(async () => {
    try {
      // Call the logout API route to clear cookies
      await logoutUser()
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      // Always clear client-side token
      removeAccessToken()

      // Clear user from SWR cache
      await mutate(apiRoutes.userInfo, undefined, false)

      // Redirect to login page
      router.push(routes.login)
    }
  }, [router])

  /**
   * Refresh user data
   * Triggers SWR revalidation
   */
  const refreshUser = useCallback(async () => {
    await mutateUser()
  }, [mutateUser])

  /**
   * Determine if the user is authenticated
   */
  const isAuthenticated = !!user && !error

  /**
   * Context value
   */
  const contextValue: AuthContextType = {
    // State
    user: user ?? null,
    error: error ?? null,
    isLoading,
    isAuthenticated,

    // Methods
    login,
    logout,
    refreshUser,
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}

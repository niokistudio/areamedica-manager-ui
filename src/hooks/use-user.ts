import useSWR from "swr"
import { apiRoutes } from "@/constants/api-routes"
import { hasAccessToken } from "@/lib/tokens/client"
import type { APIError } from "@/types/api"
import type { User } from "@/types/user"

export function useUser() {
  return useSWR<User, APIError>(
    // Only fetch if we have an access token
    hasAccessToken() ? apiRoutes.userInfo : null,
    {
      // Don't revalidate on window focus for auth
      revalidateOnFocus: false,
      // Don't revalidate on reconnect
      revalidateOnReconnect: false,
      // Don't retry on 401 (user not authenticated)
      shouldRetryOnError: (error: APIError) => error.status !== 401,
      // Dedupe requests within 5 seconds
      dedupingInterval: 5000,
    },
  )
}

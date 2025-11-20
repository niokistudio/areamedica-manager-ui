"use client"

import type { ReactNode } from "react"
import type { SWRConfiguration } from "swr"
import { SWRConfig } from "swr"
import { fetcher } from "@/lib/swr/fetcher"
import type { APIError } from "@/types/api"

interface SWRProviderProps {
  children: ReactNode
}

/**
 * SWR configuration with sensible defaults
 */
const swrConfig: SWRConfiguration = {
  fetcher,

  // Revalidation strategies
  revalidateOnFocus: true, // Revalidate when window regains focus
  revalidateOnReconnect: true, // Revalidate when connection is restored
  revalidateIfStale: true, // Revalidate if data is stale

  // Dedupe requests within 2 seconds
  dedupingInterval: 2000,

  // Cache provider (use default in-memory cache)
  // Can be replaced with a custom provider for persistence

  // Retry configuration
  shouldRetryOnError: (error: APIError) => {
    // Don't retry on client errors (4xx)
    if (error.status && error.status >= 400 && error.status < 500) {
      return false
    }
    // Retry on server errors (5xx) and network errors
    return true
  },
  errorRetryCount: 3, // Retry up to 3 times
  errorRetryInterval: 5000, // Wait 5 seconds between retries

  // Loading timeout
  loadingTimeout: 3000, // Show loading state after 3 seconds

  // Stale time
  focusThrottleInterval: 5000, // Throttle revalidation on focus to every 5 seconds

  // Error handling
  onError: (error: APIError) => {
    console.error("SWR Error:", error)
    // Can add global error handling here (e.g., toast notifications)
  },
}

export function SWRClientProvider({ children }: SWRProviderProps) {
  return <SWRConfig value={swrConfig}>{children}</SWRConfig>
}

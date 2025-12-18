import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios"
import { getSession } from "next-auth/react"
import { type APIError, APIErrorCode, type BackendError } from "@/types/api"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "/api"

/**
 * Base axios instance with default configuration
 */
export const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

/**
 * Request interceptor
 * Adds authentication token from Auth.js session to requests
 */
axiosClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // Get session from Auth.js
    const session = await getSession()

    if (session?.accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${session.accessToken}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

/**
 * Response interceptor
 * Handles errors and transforms to consistent format
 * Note: Token refresh is handled automatically by Auth.js JWT callback
 */
axiosClient.interceptors.response.use(
  (response) => {
    // Return successful responses as-is
    return response
  },
  async (error: AxiosError<BackendError | APIError>) => {
    // If 401, session has expired or is invalid
    // Auth.js will handle refresh automatically on next request
    // Client should redirect to login if refresh fails
    if (error.response?.status === 401) {
      // Check if session has refresh error
      const session = await getSession()
      if (session?.error === "RefreshAccessTokenError") {
        // Session refresh failed, user needs to re-login
        // Redirect will be handled by middleware or components
        console.error("Session expired, please login again")
      }
    }

    // Transform error into a consistent format
    const apiError: APIError = {
      message: error.message || "An unexpected error occurred",
      code: APIErrorCode.UnknownError,
      status: error.response?.status || 500,
    }

    return Promise.reject(apiError)
  },
)

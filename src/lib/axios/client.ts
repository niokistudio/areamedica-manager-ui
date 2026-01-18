import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios"
import { getAccessToken } from "@/lib/auth/token-storage"
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
 * Adds authentication token from module-level storage to requests
 * Token is kept in sync with SessionProvider via SessionTokenSync component
 * This avoids calling getSession() which triggers a network request
 */
axiosClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Get token from module-level storage (synchronous, no network request)
    const accessToken = getAccessToken()

    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`
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
  (error: AxiosError<BackendError | APIError>) => {
    // If 401, session has expired or is invalid
    // Auth.js will handle refresh automatically via SessionProvider
    // SessionTokenSync will clear the token if refresh fails
    if (error.response?.status === 401) {
      const accessToken = getAccessToken()
      if (!accessToken) {
        // No valid token available, user needs to re-login
        // Redirect will be handled by middleware or components
        console.error(
          "[Axios] No valid access token available, please login again",
        )
      }
    }

    if (error.response?.status === 422) {
      return Promise.reject(error)
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

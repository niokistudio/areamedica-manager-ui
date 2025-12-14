import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios"
import { mutate } from "swr"
import { apiRoutes } from "@/constants/api-routes"
import {
  getAccessToken,
  removeAccessToken,
  setAccessToken,
} from "@/lib/tokens/client"
import { refreshToken } from "@/services/auth.client"
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
  withCredentials: true, // Send cookies with requests (for refresh token)
})

/**
 * Request interceptor
 * Adds authentication token to requests
 */
axiosClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAccessToken()
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

/**
 * Response interceptor
 * Handles token refresh on 401 errors
 */
axiosClient.interceptors.response.use(
  (response) => {
    // Return successful responses as-is
    return response
  },
  async (error: AxiosError<BackendError | APIError>) => {
    const originalRequest = error.config

    // If the error is 401, and we haven't retried yet, attempt token refresh
    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest.headers?.["X-Retry"]
    ) {
      try {
        // Call refresh API route (refresh token sent via HTTP-only cookie)
        const { access_token: accessToken } = await refreshToken()

        // Store new access token
        setAccessToken(accessToken)

        // Trigger user revalidation to update auth state
        // This ensures the client guards detect the auth state change
        mutate(apiRoutes.userInfo)

        // Mark request as retried to prevent infinite loops
        originalRequest.headers = originalRequest.headers || {}
        originalRequest.headers["X-Retry"] = "true"
        originalRequest.headers.Authorization = `Bearer ${accessToken}`

        // Retry original request with new token
        return axiosClient(originalRequest)
      } catch (refreshError) {
        // Refresh failed, clear tokens and SWR cache
        removeAccessToken()

        // Clear the user from SWR cache to trigger auth state change
        await mutate(apiRoutes.userInfo, undefined, false)

        return Promise.reject(refreshError)
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

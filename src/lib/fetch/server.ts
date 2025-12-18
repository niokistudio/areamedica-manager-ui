"use server"

import { getAccessToken } from "@/lib/auth/session"
import { type APIError, APIErrorCode } from "@/types/api"

/**
 * Base fetch configuration
 */
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || ""

/**
 * Fetch options type
 */
interface FetchOptions extends RequestInit {
  token?: string
}

/**
 * Base fetch function with error handling
 * Uses Auth.js session token by default
 */
async function baseFetch<T>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<T> {
  const { token, headers, ...restOptions } = options

  // Get token from parameter or Auth.js session
  const authToken = token || (await getAccessToken())

  if (!API_BASE_URL) {
    throw new Error(
      "NEXT_PUBLIC_API_BASE_URL environment variable is not defined",
    )
  }

  // Build headers
  const fetchHeaders: HeadersInit = {
    "Content-Type": "application/json",
    ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
    ...headers,
  }

  // Make request
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...restOptions,
    headers: fetchHeaders,
  })

  // Parse response
  const data = await response.json().catch(() => null)

  // Handle errors
  if (!response.ok) {
    throw {
      message: data?.message || response.statusText || "An error occurred",
      code: (data?.code as APIErrorCode) || APIErrorCode.UnknownError,
      status: response.status,
    } as APIError
  }

  return data as T
}

/**
 * GET request
 */
export async function fetchGet<T>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<T> {
  return baseFetch<T>(endpoint, {
    ...options,
    method: "GET",
  })
}

/**
 * POST request
 */
export async function fetchPost<T, D = unknown>(
  endpoint: string,
  data?: D,
  options: FetchOptions = {},
): Promise<T> {
  return baseFetch<T>(endpoint, {
    ...options,
    method: "POST",
    body: data ? JSON.stringify(data) : undefined,
  })
}

/**
 * PUT request
 */
export async function fetchPut<T, D = unknown>(
  endpoint: string,
  data?: D,
  options: FetchOptions = {},
): Promise<T> {
  return baseFetch<T>(endpoint, {
    ...options,
    method: "PUT",
    body: data ? JSON.stringify(data) : undefined,
  })
}

/**
 * PATCH request
 */
export async function fetchPatch<T, D = unknown>(
  endpoint: string,
  data?: D,
  options: FetchOptions = {},
): Promise<T> {
  return baseFetch<T>(endpoint, {
    ...options,
    method: "PATCH",
    body: data ? JSON.stringify(data) : undefined,
  })
}

/**
 * DELETE request
 */
export async function fetchDelete<T>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<T> {
  return baseFetch<T>(endpoint, {
    ...options,
    method: "DELETE",
  })
}

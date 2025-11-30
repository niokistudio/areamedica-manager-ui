import useSWR from "swr"
import { apiRoutes } from "@/constants/api-routes"
import { hasAccessToken } from "@/lib/tokens/client"
import type { APIError, PaginatedResponse } from "@/types/api"
import type { Transaction } from "@/types/transactions"

export interface UseTransactionsParams {
  page?: number
  limit?: number
  search?: string
  fromDate?: string | null
  toDate?: string | null
}

export interface UseTransactionsReturn {
  transactions: Transaction[]
  total: number
  totalPages: number
  isLoading: boolean
  error: APIError | undefined
  isEmpty: boolean
  mutate: () => void
}

/**
 * Hook for fetching paginated transactions from the backend
 *
 * @param params - Query parameters for filtering and pagination
 * @returns Transactions data with loading and error states
 *
 * @example
 * ```tsx
 * const { transactions, isLoading, totalPages } = useTransactions({
 *   page: 1,
 *   limit: 10,
 *   search: 'test',
 *   fromDate: '2024-01-01',
 *   toDate: '2024-12-31',
 * })
 * ```
 */
export function useTransactions(
  params: UseTransactionsParams = {},
): UseTransactionsReturn {
  const { page = 1, limit = 10, search, fromDate, toDate } = params

  // Calculate offset for backend API
  const offset = (page - 1) * limit

  // Build query parameters
  const queryParams: Record<string, string> = {
    offset: String(offset),
    limit: String(limit),
  }

  // Add optional filters
  if (search?.trim()) {
    queryParams.search = search.trim()
  }

  if (fromDate) {
    queryParams.from_date = fromDate
  }

  if (toDate) {
    queryParams.to_date = toDate
  }

  // Build SWR key with full query string
  // SWR caches based on the key, so different params = different cache entry
  const queryString = new URLSearchParams(queryParams).toString()
  const key = hasAccessToken()
    ? `${apiRoutes.transactions}?${queryString}`
    : null

  // Fetch data with SWR
  const { data, error, isLoading, mutate } = useSWR<
    PaginatedResponse<Transaction>,
    APIError
  >(key, {
    revalidateOnFocus: true,
    dedupingInterval: 5000,
    // Don't retry on 4xx errors
    shouldRetryOnError: (err: APIError) => {
      return !(err.status >= 400 && err.status < 500)
    },
  })

  // Calculate derived values
  const transactions = data?.items ?? []
  const total = data?.total ?? 0
  const totalPages = limit > 0 ? Math.ceil(total / limit) : 0
  const isEmpty = !isLoading && transactions.length === 0

  return {
    transactions,
    total,
    totalPages,
    isLoading,
    error,
    isEmpty,
    mutate,
  }
}

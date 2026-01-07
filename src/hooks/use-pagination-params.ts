"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"
import { TransactionStatus } from "@/types/transactions"

export interface PaginationParams {
  page: number
  search: string
  fromDate: string | null
  toDate: string | null
  status: TransactionStatus | null
}

export interface UsePaginationParamsOptions {
  initialPage?: number
  initialSearch?: string
}

export interface UsePaginationParamsReturn extends PaginationParams {
  setPage: (page: number) => void
  setSearch: (search: string) => void
  setDateRange: (from: string | null, to: string | null) => void
  setFromDate: (date: string | null) => void
  setToDate: (date: string | null) => void
  setStatus: (status: TransactionStatus | null) => void
  resetFilters: () => void
  updateParams: (params: Partial<PaginationParams>) => void
}

/**
 * Reusable hook for managing pagination and filter parameters via URL search params
 *
 * Uses URL as the single source of truth for pagination and filter state.
 * Automatically handles URL updates and navigation.
 *
 * @param options - Configuration options
 * @returns Pagination state and setter functions
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { page, search, setPage, setSearch } = usePaginationParams()
 *
 *   return (
 *     <div>
 *       <input value={search} onChange={(e) => setSearch(e.target.value)} />
 *       <button onClick={() => setPage(page + 1)}>Next</button>
 *     </div>
 *   )
 * }
 * ```
 */
export function usePaginationParams(
  options: UsePaginationParamsOptions = {},
): UsePaginationParamsReturn {
  const { initialPage = 1, initialSearch = "" } = options

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Read current values from URL
  const page = (() => {
    const pageParam = searchParams.get("page")
    if (!pageParam) return initialPage
    const parsed = Number.parseInt(pageParam, 10)
    return Number.isNaN(parsed) || parsed < 1 ? initialPage : parsed
  })()

  const search = searchParams.get("search") ?? initialSearch
  const fromDate = searchParams.get("from")
  const toDate = searchParams.get("to")
  const statusParam = searchParams.get("status")
  const status = Object.values(TransactionStatus).includes(
    statusParam as TransactionStatus,
  )
    ? (statusParam as TransactionStatus)
    : null

  /**
   * Update URL search params
   */
  const updateParams = useCallback(
    (updates: Partial<PaginationParams>) => {
      const params = new URLSearchParams(searchParams.toString())

      // Handle page
      if (updates.page !== undefined) {
        if (updates.page === initialPage) {
          params.delete("page")
        } else {
          params.set("page", String(updates.page))
        }
      }

      // Handle search
      if (updates.search !== undefined) {
        if (updates.search.trim() === "") {
          params.delete("search")
        } else {
          params.set("search", updates.search.trim())
        }
      }

      // Handle fromDate
      if ("fromDate" in updates) {
        if (updates.fromDate) {
          params.set("from", updates.fromDate)
        } else {
          params.delete("from")
        }
      }

      // Handle toDate
      if ("toDate" in updates) {
        if (updates.toDate) {
          params.set("to", updates.toDate)
        } else {
          params.delete("to")
        }
      }

      // Handle status
      if ("status" in updates) {
        if (updates.status) {
          params.set("status", updates.status)
        } else {
          params.delete("status")
        }
      }

      // Build new URL
      const queryString = params.toString()
      const newUrl = queryString ? `${pathname}?${queryString}` : pathname

      // Navigate to new URL
      router.replace(newUrl, { scroll: false })
    },
    [searchParams, pathname, router, initialPage],
  )

  /**
   * Set page number (resets to page 1 when filters change)
   */
  const setPage = useCallback(
    (newPage: number) => {
      updateParams({ page: newPage })
    },
    [updateParams],
  )

  /**
   * Set the search query (resets to page 1)
   */
  const setSearch = useCallback(
    (newSearch: string) => {
      updateParams({ search: newSearch, page: initialPage })
    },
    [updateParams, initialPage],
  )

  /**
   * Set date range (resets to page 1)
   */
  const setDateRange = useCallback(
    (from: string | null, to: string | null) => {
      updateParams({ fromDate: from, toDate: to, page: initialPage })
    },
    [updateParams, initialPage],
  )

  /**
   * Set from date (resets to page 1)
   */
  const setFromDate = useCallback(
    (date: string | null) => {
      updateParams({ fromDate: date, page: initialPage })
    },
    [updateParams, initialPage],
  )

  /**
   * Set to date (resets to page 1)
   */
  const setToDate = useCallback(
    (date: string | null) => {
      updateParams({ toDate: date, page: initialPage })
    },
    [updateParams, initialPage],
  )

  /**
   * Set status filter (resets to page 1)
   */
  const setStatus = useCallback(
    (newStatus: TransactionStatus | null) => {
      updateParams({ status: newStatus, page: initialPage })
    },
    [updateParams, initialPage],
  )

  /**
   * Reset all filters to defaults
   */
  const resetFilters = useCallback(() => {
    updateParams({
      page: initialPage,
      search: initialSearch,
      fromDate: null,
      toDate: null,
      status: null,
    })
  }, [updateParams, initialPage, initialSearch])

  return {
    // Current values
    page,
    search,
    fromDate,
    toDate,
    status,

    // Setters
    setPage,
    setSearch,
    setDateRange,
    setFromDate,
    setToDate,
    setStatus,
    resetFilters,
    updateParams,
  }
}

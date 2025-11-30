import { useMemo } from "react"
import useSWR from "swr"
import { apiRoutes } from "@/constants/api-routes"
import type { APIError } from "@/types/api"
import type { Transaction } from "@/types/transactions"

export interface UseTransactionReturn {
  transaction: Transaction | undefined
  isLoading: boolean
  error: APIError | undefined
  mutate: () => void
}

/**
 * Hook for fetching a single transaction by ID from the backend
 *
 * @param id - Transaction ID
 * @returns Transaction data with loading and error states
 *
 * @example
 * ```tsx
 * function TransactionDetails({ id }: { id: string }) {
 *   const { transaction, isLoading, error } = useTransaction(id)
 *
 *   if (isLoading) return <div>Loading...</div>
 *   if (error) return <div>Error: {error.message}</div>
 *   if (!transaction) return <div>Transaction not found</div>
 *
 *   return <div>{transaction.reference}</div>
 * }
 * ```
 */
export function useTransaction(id: string): UseTransactionReturn {
  const key = useMemo(() => (id ? apiRoutes.transactionById(id) : null), [id])
  // Only make the request if we have an access token
  const { data, error, isLoading, mutate } = useSWR<Transaction, APIError>(key)

  return {
    transaction: data,
    isLoading,
    error,
    mutate,
  }
}

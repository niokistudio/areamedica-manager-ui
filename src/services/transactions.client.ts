import { apiRoutes } from "@/constants/api-routes"
import { axiosClient } from "@/lib/axios/client"
import type {
  FullReferenceTransactionRequest,
  PartialReferenceTransactionRequest,
  Transaction,
} from "@/types/transactions"

export async function createFullReferenceTransaction(
  request: FullReferenceTransactionRequest,
) {
  return await axiosClient.post<Transaction>(
    `${apiRoutes.transactions}/full-reference`,
    request,
  )
}

export async function createPartialReferenceTransaction(
  request: PartialReferenceTransactionRequest,
) {
  return await axiosClient.post<Transaction>(
    `${apiRoutes.transactions}/partial-reference`,
    request,
  )
}

/**
 * Delete a transaction by ID
 * @param id Transaction ID to delete
 */
export async function deleteTransaction(id: string): Promise<void> {
  await axiosClient.delete(apiRoutes.transactionById(id))
}

/**
 * Delete multiple transactions by IDs
 * @param ids Array of transaction IDs to delete
 * @returns Promise that resolves when all deletions are complete
 */
export async function bulkDeleteTransactions(ids: string[]): Promise<void> {
  // Delete all transactions in parallel
  await axiosClient.post(apiRoutes.transactionsBulkDelete, ids)
}

export async function refreshTransaction(id: string): Promise<void> {
  await axiosClient.post(apiRoutes.refreshTransaction(id))
}

import { apiRoutes } from "@/constants/api-routes"
import { axiosClient } from "@/lib/axios/client"
import type { NewTransactionRequest, Transaction } from "@/types/transactions"

export async function createTransaction(request: NewTransactionRequest) {
  return await axiosClient.post<Transaction>(apiRoutes.transactions, request)
}

/**
 * Delete a transaction by ID
 * @param id Transaction ID to delete
 */
export async function deleteTransaction(id: string): Promise<void> {
  await axiosClient.delete(apiRoutes.transactionById(id))
}

export async function refreshTransaction(id: string): Promise<void> {
  await axiosClient.post(apiRoutes.refreshTransaction(id))
}

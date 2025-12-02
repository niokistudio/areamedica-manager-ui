import { apiRoutes } from "@/constants/api-routes"
import { axiosClient } from "@/lib/axios/client"

/**
 * Delete a transaction by ID
 * @param id Transaction ID to delete
 */
export async function deleteTransaction(id: string): Promise<void> {
  await axiosClient.delete(apiRoutes.transactionById(id))
}

import { useCallback } from "react"
import { useReceiptPrintStore } from "@/stores/useReceiptPrintStore"
import type { Transaction } from "@/types/transactions"

/**
 * Hook to easily open the receipt print modal from any component
 *
 * @example
 * ```tsx
 * const { openReceiptModal } = useReceiptPrint()
 *
 * const handleDownload = () => {
 *   openReceiptModal(transaction)
 * }
 * ```
 */
export function useReceiptPrint() {
  const openModal = useReceiptPrintStore((state) => state.openModal)

  const openReceiptModal = useCallback(
    (transaction: Transaction) => {
      openModal(transaction)
    },
    [openModal],
  )

  return { openReceiptModal }
}

"use client"

import { addToast } from "@heroui/toast"
import { AnimatePresence, motion } from "framer-motion"
import { Trash2 } from "lucide-react"
import { useTranslations } from "next-intl"
import { useCallback, useState } from "react"
import { mutate } from "swr"
import { Button } from "@/components/ui/Button"
import { apiRoutes } from "@/constants/api-routes"
import { ConfirmationError } from "@/errors/ConfirmationError"
import { usePaginationParams } from "@/hooks/use-pagination-params"
import { useTransactions } from "@/hooks/use-transactions"
import { useConfirmDialog } from "@/hooks/useConfirmDialog"
import { bulkDeleteTransactions } from "@/services/transactions.client"
import { useTransactionsStore } from "@/stores/useTransactionsStore"

export function TransactionsDeleteAction() {
  const t = useTranslations("TransactionsPage.toolbar.actions")
  const { confirm } = useConfirmDialog()
  const [isDeleting, setIsDeleting] = useState(false)

  // Get selected transactions from store
  const { selectedKeys, clearSelection } = useTransactionsStore()

  // Get current transactions to resolve "all" selection
  const { page, search, fromDate, toDate } = usePaginationParams()
  const { transactions } = useTransactions({
    page,
    search,
    fromDate,
    toDate,
  })

  const handleDelete = useCallback(async () => {
    try {
      // Resolve selected transaction IDs
      const idsToDelete: string[] =
        selectedKeys === "all"
          ? transactions.map((tx) => tx.id)
          : Array.from(selectedKeys).map(String)

      if (idsToDelete.length === 0) {
        return
      }

      // Show confirmation dialog
      await confirm({
        title: t("deleteConfirmTitle", { count: idsToDelete.length }),
        description: t("deleteConfirmDescription", {
          count: idsToDelete.length,
        }),
        confirmText: t("delete"),
        confirmColor: "danger",
      })

      setIsDeleting(true)

      // Delete all selected transactions
      await bulkDeleteTransactions(idsToDelete)

      // Invalidate all transaction-related caches
      await mutate((key) => {
        if (typeof key === "string") {
          return key.startsWith(apiRoutes.transactions)
        }
        return false
      })

      // Clear selection
      clearSelection()

      // Show a success message
      addToast({
        title: t("deleteSuccess", { count: idsToDelete.length }),
        color: "success",
      })
    } catch (error) {
      // User canceled or error occurred
      if (error instanceof ConfirmationError) {
        return
      }

      addToast({
        title: t("deleteError"),
        color: "danger",
      })
    } finally {
      setIsDeleting(false)
    }
  }, [selectedKeys, transactions, confirm, t, clearSelection])

  const selectedCount =
    selectedKeys === "all" ? transactions.length : selectedKeys.size

  // Show text content only when more than 1 item is selected
  const showText = selectedCount > 1

  return (
    <Button
      variant="flat"
      color="danger"
      isIconOnly={!showText}
      onPress={handleDelete}
      isDisabled={isDeleting || selectedCount === 0}
      aria-label={t("delete")}
      title={t("delete")}
      className="overflow-hidden transition-size duration-200"
    >
      <Trash2 className="size-4 shrink-0" />
      <AnimatePresence mode="sync">
        {showText && (
          <motion.span
            key="delete-text"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "auto", opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden whitespace-nowrap"
          >
            {t("delete")}
          </motion.span>
        )}
      </AnimatePresence>
    </Button>
  )
}

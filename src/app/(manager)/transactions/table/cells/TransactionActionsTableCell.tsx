import { Button } from "@heroui/button"
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown"
import { addToast } from "@heroui/toast"
import type { LucideIcon } from "lucide-react"
import { Download, Ellipsis, Eye, Pencil, Trash2 } from "lucide-react"
import { useTranslations } from "next-intl"
import { useCallback, useMemo, useState } from "react"
import { mutate } from "swr"
import { apiRoutes } from "@/constants/api-routes"
import { routes } from "@/constants/routes"
import { ConfirmationError } from "@/errors/ConfirmationError"
import { useConfirmDialog } from "@/hooks/useConfirmDialog"
import { useReceiptPrint } from "@/hooks/useReceiptPrint"
import { deleteTransaction } from "@/services/transactions.client"
import { type Transaction, TransactionStatus } from "@/types/transactions"

interface TransactionActionsTableCellProps {
  transaction: Transaction
}

interface TransactionAction {
  key: string
  label: string
  icon: LucideIcon
  onClick?: () => void
  href?: string
  className?: string
  color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger"
  isDisabled?: boolean
  isVisible?: (transaction: Transaction) => boolean
}

export function TransactionActionsTableCell({
  transaction,
}: TransactionActionsTableCellProps) {
  const t = useTranslations("TransactionsPage.table.actions")
  const { confirm } = useConfirmDialog()
  const { openReceiptModal } = useReceiptPrint()
  const [isDeleting, setIsDeleting] = useState(false)

  const detailsUrl = useMemo(
    () => routes.transactionDetail(transaction.id),
    [transaction.id],
  )

  const editUrl = useMemo(
    () => routes.transactionEdit(transaction.id),
    [transaction.id],
  )

  const handleDelete = useCallback(async () => {
    try {
      await confirm({
        title: t("deleteConfirmTitle"),
        description: t("deleteConfirmDescription"),
        confirmText: t("delete"),
        confirmColor: "danger",
      })

      setIsDeleting(true)

      await deleteTransaction(transaction.id)

      // Invalidate transaction cache to refresh the list
      await mutate(apiRoutes.transactions)

      addToast({
        title: t("deleteSuccess"),
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
  }, [transaction.id, confirm, t])

  const handleDownload = useCallback(() => {
    openReceiptModal(transaction)
  }, [transaction, openReceiptModal])

  // Define all possible actions in an array
  const actions = useMemo<TransactionAction[]>(
    () => [
      {
        key: "open",
        label: t("openDetails"),
        icon: Eye,
        href: detailsUrl,
      },
      {
        key: "edit",
        label: t("edit"),
        icon: Pencil,
        href: editUrl,
        // Only show download action for processing transactions
        isVisible: (transaction) =>
          transaction.status === TransactionStatus.InProgress ||
          transaction.status === TransactionStatus.ToReview,
      },
      {
        key: "download",
        label: t("download"),
        icon: Download,
        onClick: handleDownload,
        // Only show download action for completed transactions
        isVisible: (transaction) =>
          transaction.status === TransactionStatus.Completed,
      },
      {
        key: "delete",
        label: t("delete"),
        icon: Trash2,
        onClick: handleDelete,
        className: "text-danger",
        color: "danger",
        isDisabled: isDeleting,
      },
    ],
    [t, detailsUrl, editUrl, handleDownload, handleDelete, isDeleting],
  )

  // Filter actions based on showWhen condition
  const visibleActions = useMemo(
    () =>
      actions.filter(
        (action) => !action.isVisible || action.isVisible(transaction),
      ),
    [actions, transaction],
  )

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          variant="light"
          isIconOnly
          className="invisible group-data-[hover=true]/tr:visible aria-[expanded=true]:visible"
        >
          <Ellipsis className="size-4" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label={t("menu")} variant="faded">
        {visibleActions.map((action) => {
          const Icon = action.icon
          return (
            <DropdownItem
              key={action.key}
              href={action.href}
              onClick={action.onClick}
              className={action.className}
              color={action.color}
              isDisabled={action.isDisabled}
              startContent={<Icon className="size-4" />}
            >
              {action.label}
            </DropdownItem>
          )
        })}
      </DropdownMenu>
    </Dropdown>
  )
}

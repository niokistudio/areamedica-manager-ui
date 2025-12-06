import { Button } from "@heroui/button"
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown"
import { addToast } from "@heroui/toast"
import { Download, Ellipsis, Eye, Pencil, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import { useCallback, useMemo, useState } from "react"
import { mutate } from "swr"
import { apiRoutes } from "@/constants/api-routes"
import { routes } from "@/constants/routes"
import { ConfirmationError } from "@/errors/ConfirmationError"
import { useConfirmDialog } from "@/hooks/useConfirmDialog"
import { useReceiptPrint } from "@/hooks/useReceiptPrint"
import { deleteTransaction } from "@/services/transactions.client"
import { type ITransaction, TransactionStatus } from "@/types/transactions"

interface TransactionActionsTableCellProps {
  transaction: ITransaction
}

export function TransactionActionsTableCell({
  transaction,
}: TransactionActionsTableCellProps) {
  const t = useTranslations("TransactionsPage.table.actions")
  const router = useRouter()
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

  const handleEdit = useCallback(() => {
    router.push(editUrl)
  }, [router, editUrl])

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
        <DropdownItem
          key="open"
          href={detailsUrl}
          startContent={<Eye className="size-4" />}
        >
          {t("openDetails")}
        </DropdownItem>
        <DropdownItem
          key="edit"
          startContent={<Pencil className="size-4" />}
          onClick={handleEdit}
        >
          {t("edit")}
        </DropdownItem>
        {transaction.status === TransactionStatus.Completed ? (
          <DropdownItem
            key="download"
            startContent={<Download className="size-4" />}
            onClick={handleDownload}
          >
            {t("download")}
          </DropdownItem>
        ) : null}
        <DropdownItem
          key="delete"
          className="text-danger"
          color="danger"
          startContent={<Trash2 className="size-4" />}
          isDisabled={isDeleting}
          onClick={handleDelete}
        >
          {t("delete")}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}

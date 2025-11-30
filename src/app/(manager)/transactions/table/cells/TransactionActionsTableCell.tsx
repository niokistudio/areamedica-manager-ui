import { Button } from "@heroui/button"
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown"
import { Download, Ellipsis, Eye, Pencil, Trash2 } from "lucide-react"
import { useTranslations } from "next-intl"
import { useMemo } from "react"
import { routes } from "@/constants/routes"
import { type Transaction, TransactionStatus } from "@/types/transactions"

interface TransactionActionsTableCellProps {
  transaction: Transaction
}

export function TransactionActionsTableCell({
  transaction,
}: TransactionActionsTableCellProps) {
  const t = useTranslations("TransactionsPage.table.actions")
  const detailsUrl = useMemo(
    () => routes.transactionDetail(transaction.id),
    [transaction.id],
  )
  // TODO: Implement each action for transactions

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
        {transaction.status === TransactionStatus.COMPLETED ? (
          <DropdownItem
            key="download"
            startContent={<Download className="size-4" />}
          >
            {t("download")}
          </DropdownItem>
        ) : null}
        <DropdownItem key="edit" startContent={<Pencil className="size-4" />}>
          {t("edit")}
        </DropdownItem>
        <DropdownItem
          key="delete"
          className="text-danger"
          color="danger"
          startContent={<Trash2 className="size-4" />}
        >
          {t("delete")}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}

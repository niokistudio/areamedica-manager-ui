import { getKeyValue } from "@heroui/table"
import type { Key } from "@react-types/shared"
import { useTranslations } from "next-intl"
import { type ReactNode, useCallback, useMemo } from "react"
import { TransactionActionsTableCell } from "@/app/(manager)/transactions/table/cells/TransactionActionsTableCell"
import { TransactionStatusTableCell } from "@/app/(manager)/transactions/table/cells/TransactionStatusTableCell"
import { TransactionTypeTableCell } from "@/app/(manager)/transactions/table/cells/TransactionTypeTableCell"
import { CurrencyTableCell } from "@/components/ui/table-cells/CurrencyTableCell"
import { DateTableCell } from "@/components/ui/table-cells/DateTableCell"
import { DefaultTableCell } from "@/components/ui/table-cells/DefaultTableCell"
import type { Transaction } from "@/types/transactions"
import { formatDocument } from "@/utils/document"
import type {
  TransactionColumn,
  TransactionColumnKey,
} from "./TransactionsTable.types"

/**
 * Record of column-specific render components
 * Maps ColumnKey to a render function that returns a React component
 */
const columnRenderers: Partial<
  Record<
    TransactionColumnKey,
    string | ((transaction: Transaction) => ReactNode)
  >
> = {
  status: (transaction) => (
    <TransactionStatusTableCell status={transaction.status} />
  ),
  nationalId: (transaction) => (
    <DefaultTableCell className="break-keep text-nowrap">
      {formatDocument(transaction.customer_document) || "-"}
    </DefaultTableCell>
  ),
  date: (transaction) => <DateTableCell value={transaction.created_at} />,
  amount: (transaction) => (
    <CurrencyTableCell value={transaction.details?.amount || 0} />
  ),
  type: (transaction) => <TransactionTypeTableCell type={transaction.type} />,
  actions: (transaction) => (
    <TransactionActionsTableCell transaction={transaction} />
  ),
  name: "customer_full_name",
  phone: "customer_phone",
}

/**
 * Hook for managing transaction table columns
 * Provides column configuration and cell rendering using a record-based approach
 */
export function useTransactionsColumns() {
  const t = useTranslations("TransactionsPage.table")

  const columns: TransactionColumn[] = useMemo(
    () => [
      { key: "name", label: t("column.name"), sortable: true },
      { key: "nationalId", label: t("column.nationalId"), sortable: true },
      { key: "phone", label: t("column.phone"), sortable: false },
      { key: "status", label: t("column.status"), sortable: true },
      { key: "reference", label: t("column.reference"), sortable: true },
      { key: "date", label: t("column.date"), sortable: true },
      { key: "amount", label: t("column.amount"), sortable: true },
      { key: "type", label: t("column.type"), sortable: true },
      { key: "actions", label: "", sortable: false },
    ],
    [t],
  )

  // Render cell content based on a column key
  const renderCell = useCallback((transaction: Transaction, key: Key) => {
    const columnKey = key as TransactionColumnKey

    // Check if there's a custom renderer for this column
    const customRenderer = columnRenderers[columnKey]
    if (customRenderer) {
      return typeof customRenderer === "function" ? (
        customRenderer(transaction)
      ) : (
        <DefaultTableCell>
          {getKeyValue(transaction, customRenderer)}
        </DefaultTableCell>
      )
    }

    return (
      <DefaultTableCell>{getKeyValue(transaction, columnKey)}</DefaultTableCell>
    )
  }, [])

  return {
    columns,
    renderCell,
  }
}

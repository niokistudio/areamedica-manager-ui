import { useTranslations } from "next-intl"
import { DefaultTableCell } from "@/components/ui/table-cells/DefaultTableCell"
import type { TransactionType } from "@/types/transactions"

interface TransactionTypeTableCellProps {
  type: TransactionType
}

export function TransactionTypeTableCell({
  type,
}: TransactionTypeTableCellProps) {
  const t = useTranslations("ITransactions.TransactionType")
  return <DefaultTableCell>{t(type)}</DefaultTableCell>
}

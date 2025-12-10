import { DefaultTableCell } from "@/components/ui/table-cells/DefaultTableCell"
import { formatCurrency } from "@/utils/numbers"

interface CurrencyTableCellProps {
  value?: number
}

export function CurrencyTableCell({ value }: CurrencyTableCellProps) {
  return (
    <DefaultTableCell>{value ? formatCurrency(value) : "-"}</DefaultTableCell>
  )
}

import { DefaultTableCell } from "@/components/ui/table-cells/DefaultTableCell"
import { formatDate } from "@/utils/dates"

interface CurrencyTableCellProps {
  value: string
  locale?: string
  options?: Intl.DateTimeFormatOptions
}

export function DateTableCell({
  value,
  locale,
  options,
}: CurrencyTableCellProps) {
  return (
    <DefaultTableCell>{formatDate(value, locale, options)}</DefaultTableCell>
  )
}

import { Chip } from "@heroui/chip"
import { cn } from "@heroui/theme"
import { useTranslations } from "next-intl"
import { DefaultTableCell } from "@/components/ui/table-cells/DefaultTableCell"
import { statusColorMap, statusIconMap } from "@/constants/transactions"
import type { TransactionStatus } from "@/types/transactions"

interface TransactionStatusTableCellProps {
  status: TransactionStatus
}

export function TransactionStatusTableCell({
  status,
}: TransactionStatusTableCellProps) {
  const t = useTranslations("ITransactions.TransactionStatus")
  const colorVariant = statusColorMap[status]
  const Icon = statusIconMap[status]

  return (
    <DefaultTableCell>
      <Chip
        size="sm"
        variant="flat"
        color={colorVariant}
        startContent={Icon ? <Icon className="size-4" /> : null}
        className="gap-1"
      >
        {t(status)}
      </Chip>
    </DefaultTableCell>
  )
}

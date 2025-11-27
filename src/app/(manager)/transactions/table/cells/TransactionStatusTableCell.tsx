import { Chip, type ChipProps } from "@heroui/chip"
import { cn } from "@heroui/theme"
import {
  AlertCircle,
  Ban,
  CheckCircle,
  HelpCircle,
  Loader2,
  type LucideIcon,
} from "lucide-react"
import { useTranslations } from "next-intl"
import { DefaultTableCell } from "@/components/ui/table-cells/DefaultTableCell"
import { TransactionStatus } from "@/types/transactions"

export const statusColorMap: Record<TransactionStatus, ChipProps["color"]> = {
  IN_PROGRESS: "primary",
  COMPLETED: "success",
  CANCELED: "default",
  UNKNOWN: "warning",
  TO_REVIEW: "secondary",
}

export const statusIconMap: Record<TransactionStatus, LucideIcon> = {
  IN_PROGRESS: Loader2,
  COMPLETED: CheckCircle,
  CANCELED: Ban,
  UNKNOWN: HelpCircle,
  TO_REVIEW: AlertCircle,
}

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
        startContent={
          Icon ? (
            <Icon
              className={cn(
                "size-4",
                status === TransactionStatus.IN_PROGRESS &&
                  "animate-spinner-linear-spin",
              )}
            />
          ) : null
        }
        className="gap-1"
      >
        {t(status)}
      </Chip>
    </DefaultTableCell>
  )
}

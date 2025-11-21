import { Chip, type ChipProps } from "@heroui/chip"
import { cn } from "@heroui/theme"
import {
  Ban,
  CheckCircle,
  Clock,
  Loader2,
  type LucideIcon,
  XOctagon,
} from "lucide-react"
import { useTranslations } from "next-intl"
import { DefaultTableCell } from "@/components/ui/table-cells/DefaultTableCell"
import { TransactionStatus } from "@/types/transactions"

export const statusColorMap: Record<TransactionStatus, ChipProps["color"]> = {
  PENDING: "warning",
  IN_PROGRESS: "primary",
  COMPLETED: "success",
  FAILED: "danger",
  CANCELLED: "default",
}

export const statusIconMap: Record<TransactionStatus, LucideIcon> = {
  PENDING: Clock,
  IN_PROGRESS: Loader2,
  COMPLETED: CheckCircle,
  FAILED: XOctagon,
  CANCELLED: Ban,
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
          <Icon
            className={cn(
              "size-4",
              status === TransactionStatus.IN_PROGRESS &&
                "animate-spinner-linear-spin",
            )}
          />
        }
        className="gap-1"
      >
        {t(status)}
      </Chip>
    </DefaultTableCell>
  )
}

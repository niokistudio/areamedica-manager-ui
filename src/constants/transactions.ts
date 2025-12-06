import type { ChipProps } from "@heroui/chip"
import {
  AlertCircle,
  Ban,
  CheckCircle,
  Clock,
  HelpCircle,
  type LucideIcon,
} from "lucide-react"
import type { TransactionStatus } from "@/types/transactions"

export const statusColorMap: Record<TransactionStatus, ChipProps["color"]> = {
  IN_PROGRESS: "primary",
  COMPLETED: "success",
  CANCELED: "default",
  UNKNOWN: "warning",
  TO_REVIEW: "secondary",
}
export const statusIconMap: Record<TransactionStatus, LucideIcon> = {
  IN_PROGRESS: Clock,
  COMPLETED: CheckCircle,
  CANCELED: Ban,
  UNKNOWN: HelpCircle,
  TO_REVIEW: AlertCircle,
}

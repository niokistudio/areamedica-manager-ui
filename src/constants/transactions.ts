import type { ChipProps } from "@heroui/chip"
import {
  Ban,
  CheckCircle,
  Clock,
  HelpCircle,
  type LucideIcon,
} from "lucide-react"
import type { TransactionStatus } from "@/types/transactions"

export const statusColorMap: Record<TransactionStatus, ChipProps["color"]> = {
  IN_PROGRESS: "warning",
  COMPLETED: "success",
  CANCELED: "danger",
  UNKNOWN: "danger",
  TO_REVIEW: "warning",
}
export const statusIconMap: Record<TransactionStatus, LucideIcon> = {
  IN_PROGRESS: Clock,
  COMPLETED: CheckCircle,
  CANCELED: Ban,
  UNKNOWN: HelpCircle,
  TO_REVIEW: Clock,
}

import type { ChipProps } from "@heroui/chip"
import {
  Ban,
  CheckCircle,
  Clock,
  HelpCircle,
  type LucideIcon,
} from "lucide-react"
import { TransactionStatus } from "@/types/transactions"

export enum TransactionStatusFilter {
  Verified = "verified",
  Pending = "pending",
  Rejected = "rejected",
}

export const filterToStatusMap: Record<
  TransactionStatusFilter,
  TransactionStatus[]
> = {
  [TransactionStatusFilter.Verified]: [TransactionStatus.Completed],
  [TransactionStatusFilter.Pending]: [
    TransactionStatus.InProgress,
    TransactionStatus.ToReview,
    TransactionStatus.Unknown,
  ],
  [TransactionStatusFilter.Rejected]: [TransactionStatus.Canceled],
}

export const filterColorMap: Record<
  TransactionStatusFilter,
  ChipProps["color"]
> = {
  [TransactionStatusFilter.Verified]: "success",
  [TransactionStatusFilter.Pending]: "warning",
  [TransactionStatusFilter.Rejected]: "danger",
}

export const filterIconMap: Record<TransactionStatusFilter, LucideIcon> = {
  [TransactionStatusFilter.Verified]: CheckCircle,
  [TransactionStatusFilter.Pending]: Clock,
  [TransactionStatusFilter.Rejected]: Ban,
}

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

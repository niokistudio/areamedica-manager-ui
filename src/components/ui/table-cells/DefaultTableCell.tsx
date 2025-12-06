import { cn } from "@heroui/theme"
import type { ReactNode } from "react"

interface TableCellProps {
  className?: string
  children: ReactNode
}

export function DefaultTableCell({ className, children }: TableCellProps) {
  return <span className={cn("text-xs", className)}>{children}</span>
}

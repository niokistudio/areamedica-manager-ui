import { cn } from "@heroui/theme"
import type { ComponentPropsWithoutRef } from "react"

type TableCellProps = ComponentPropsWithoutRef<'span'>

export function DefaultTableCell({ className, children, ...props }: TableCellProps) {
  return <span className={cn("text-xs", className)} {...props}>{children}</span>
}

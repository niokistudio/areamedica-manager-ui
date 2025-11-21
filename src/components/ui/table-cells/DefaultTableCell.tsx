import type { ReactNode } from "react"

interface TableCellProps {
  children: ReactNode
}

export function DefaultTableCell({ children }: TableCellProps) {
  return <span className="text-xs">{children}</span>
}

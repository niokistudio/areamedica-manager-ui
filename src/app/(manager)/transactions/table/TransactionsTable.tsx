"use client"

import { Pagination } from "@heroui/pagination"
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table"
import type { Key } from "@react-types/shared"
import type { Transaction } from "@/types/transactions"
import { useTransactionsColumns } from "./useTransactionsColumns"

interface TransactionsTableProps {
  transactions: Transaction[]
  isLoading?: boolean
  // Pagination props
  page: number
  totalPages: number
  onPageChange: (page: number) => void
  // Selection props
  selectedKeys: "all" | Set<Key>
  onSelectionChange: (keys: "all" | Set<Key>) => void
}

export function TransactionsTable({
  transactions,
  isLoading = false,
  page,
  totalPages,
  onPageChange,
  selectedKeys,
  onSelectionChange,
}: TransactionsTableProps) {
  const { columns, renderCell } = useTransactionsColumns()

  return (
    <div className="flex flex-col gap-6">
      <Table
        aria-label="Transactions table"
        selectionMode="multiple"
        selectedKeys={selectedKeys}
        onSelectionChange={onSelectionChange}
        classNames={{
          wrapper: "min-h-[400px]",
        }}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.key}
              align={column.key === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
              className="text-primary"
            >
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={transactions}
          isLoading={isLoading}
          loadingContent={<div>Loading transactions...</div>}
          emptyContent={<div>No transactions found</div>}
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      {totalPages > 0 && (
        <div className="flex w-full justify-center">
          <Pagination
            showControls
            color="primary"
            page={page}
            total={totalPages}
            className="m-0"
            onChange={onPageChange}
          />
        </div>
      )}
    </div>
  )
}

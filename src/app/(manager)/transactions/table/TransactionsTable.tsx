"use client"

import { Pagination } from "@heroui/pagination"
import {
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table"
import type { Key } from "@react-types/shared"
import dynamic from "next/dynamic"
import { useRouter } from "next/navigation"
import { routes } from "@/constants/routes"
import { useTransactionsStore } from "@/stores/useTransactionsStore"
import type { Transaction } from "@/types/transactions"
import { useTransactionsColumns } from "./useTransactionsColumns"

//  Dynamically import table to avoid hydration mismatches
const Table = dynamic(() => import("@heroui/table").then((m) => m.Table), {
  ssr: false,
})

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
  isLoading = true,
  page,
  totalPages,
  onPageChange,
}: TransactionsTableProps) {
  const router = useRouter()
  const { columns, renderCell } = useTransactionsColumns()
  const { selectedKeys, setSelectedKeys } = useTransactionsStore()

  const redirectToDetails = (id: Key | bigint) => {
    router.push(routes.transactionDetail(id as string))
  }

  return (
    <div className="flex flex-col gap-6">
      <Table
        aria-label="Transactions table"
        classNames={{
          wrapper: "min-h-[400px]",
        }}
        selectionMode="multiple"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
        onRowAction={redirectToDetails}
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

      {totalPages > 1 && (
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

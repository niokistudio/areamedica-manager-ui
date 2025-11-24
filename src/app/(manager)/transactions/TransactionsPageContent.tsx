"use client"

import { Plus } from "lucide-react"
import { useMemo } from "react"
import { TransactionsTable } from "@/app/(manager)/transactions/table/TransactionsTable"
import { TransactionsToolbar } from "@/app/(manager)/transactions/toolbar/TransactionsToolbar"
import { Button } from "@/components/ui/Button"
import { mockTransactions } from "@/mocks/transactions"
import { useTransactionsStore } from "@/stores/useTransactionsStore"

const ROWS_PER_PAGE = 10

export function TransactionsPageContent() {
  const selectedKeys = useTransactionsStore((state) => state.selectedKeys)
  const page = useTransactionsStore((state) => state.page)
  const setSelectedKeys = useTransactionsStore((state) => state.setSelectedKeys)
  const setPage = useTransactionsStore((state) => state.setPage)

  // Calculate pagination
  const totalPages = Math.ceil(mockTransactions.length / ROWS_PER_PAGE)

  // Get paginated items
  const paginatedTransactions = useMemo(() => {
    const start = (page - 1) * ROWS_PER_PAGE
    const end = start + ROWS_PER_PAGE
    return mockTransactions.slice(start, end)
  }, [page])

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  // Handle selection change
  const handleSelectionChange = (keys: "all" | typeof selectedKeys) => {
    setSelectedKeys(keys)
  }

  return (
    <div className="h-full flex flex-col pt-10">
      <div className="flex justify-between mb-14">
        <h1 className="text-3xl font-bold">Listado de transacciones</h1>
        <Button color="primary">
          Nueva Consulta <Plus className="size-4" />
        </Button>
      </div>
      <div className="flex flex-col gap-8">
        <TransactionsToolbar />
        <TransactionsTable
          transactions={paginatedTransactions}
          page={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          selectedKeys={selectedKeys}
          onSelectionChange={handleSelectionChange}
        />
      </div>
    </div>
  )
}

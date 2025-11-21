"use client"

import { Input } from "@heroui/input"
import type { Key } from "@react-types/shared"
import { Download, Plus, Search, SquarePen, Trash2 } from "lucide-react"
import { useMemo, useState } from "react"
import { TransactionsTable } from "@/app/(manager)/transactions/table/TransactionsTable"
import { Button } from "@/components/ui/Button"
import { mockTransactions } from "@/mocks/transactions"

const ROWS_PER_PAGE = 10

export function TransactionsPageContent() {
  const [page, setPage] = useState<number>(1)
  const [selectedKeys, setSelectedKeys] = useState<"all" | Set<Key>>(
    new Set([]),
  )

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
  const handleSelectionChange = (keys: "all" | Set<Key>) => {
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
        <div className="flex justify-between gap-2">
          <Input
            className="max-w-xs"
            placeholder="Buscar transacciones"
            endContent={
              <div>
                <Button size="sm" variant="light" isIconOnly>
                  <Search className="size-4" />
                </Button>
              </div>
            }
          />
          <div className="flex gap-2">
            <Button variant="light" color="primary" isIconOnly>
              <Download className="size-4" />
            </Button>
            <Button variant="light" color="primary" isIconOnly>
              <SquarePen className="size-4" />
            </Button>
            <Button variant="light" color="danger" isIconOnly>
              <Trash2 className="size-4" />
            </Button>
          </div>
        </div>
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

"use client"

import { Plus } from "lucide-react"
import Link from "next/link"
import { useTranslations } from "next-intl"
import { TransactionsTable } from "@/app/(manager)/transactions/table/TransactionsTable"
import { TransactionsToolbar } from "@/app/(manager)/transactions/toolbar/TransactionsToolbar"
import { Button } from "@/components/ui/Button"
import { usePaginationParams } from "@/hooks/use-pagination-params"
import { useTransactions } from "@/hooks/use-transactions"
import { useTransactionsStore } from "@/stores/useTransactionsStore"

const ROWS_PER_PAGE = 10

export function TransactionsPageContent() {
  const t = useTranslations("TransactionsPage")
  // Get pagination and filter state from URL params (single source of truth)
  const { page, search, fromDate, toDate, setPage } = usePaginationParams()

  // Get selection state from store (UI-specific, not in URL)
  const selectedKeys = useTransactionsStore((state) => state.selectedKeys)
  const setSelectedKeys = useTransactionsStore((state) => state.setSelectedKeys)

  // Fetch transactions from API
  const { transactions, totalPages, isLoading, error } = useTransactions({
    page,
    limit: ROWS_PER_PAGE,
    search,
    fromDate,
    toDate,
  })

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
        <h1 className="text-3xl font-bold">{t("list.title")}</h1>
        <Button as={Link} href="/transactions/new" color="primary">
          {t("list.newButton")} <Plus className="size-4" />
        </Button>
      </div>
      <div className="flex flex-col gap-8">
        <TransactionsToolbar />
        {error ? (
          <div className="text-center">
            <p className="text-danger text-lg font-semibold mb-2">
              Error al cargar transacciones
            </p>
            <p className="text-default-500">{error.message}</p>
          </div>
        ) : (
          <TransactionsTable
            transactions={transactions}
            isLoading={isLoading}
            page={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            selectedKeys={selectedKeys}
            onSelectionChange={handleSelectionChange}
          />
        )}
      </div>
    </div>
  )
}

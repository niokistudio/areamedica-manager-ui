"use client"

import { Input } from "@heroui/input"
import { Search } from "lucide-react"
import { TransactionsDeleteAction } from "@/app/(manager)/transactions/toolbar/actions/TransactionsDeleteAction"
import { TransactionsDownloadAction } from "@/app/(manager)/transactions/toolbar/actions/TransactionsDownloadAction"
import { TransactionsEditAction } from "@/app/(manager)/transactions/toolbar/actions/TransactionsEditAction"
import { Button } from "@/components/ui/Button"
import { useTransactionsStore } from "@/stores/useTransactionsStore"

export function TransactionsToolbar() {
  const searchValue = useTransactionsStore((state) => state.searchValue)
  const setSearchValue = useTransactionsStore((state) => state.setSearchValue)

  return (
    <div className="flex justify-between gap-2">
      <Input
        className="max-w-xs"
        placeholder="Buscar transacciones"
        value={searchValue}
        onValueChange={setSearchValue}
        endContent={
          <Button size="sm" variant="light" isIconOnly>
            <Search className="size-4" />
          </Button>
        }
      />
      <div className="flex gap-2">
        <TransactionsDownloadAction />
        <TransactionsEditAction />
        <TransactionsDeleteAction />
      </div>
    </div>
  )
}

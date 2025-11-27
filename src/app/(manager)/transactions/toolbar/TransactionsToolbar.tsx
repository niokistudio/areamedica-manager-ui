"use client"

import { Input } from "@heroui/input"
import { Search } from "lucide-react"
import { useCallback, useState } from "react"
import { TransactionsDeleteAction } from "@/app/(manager)/transactions/toolbar/actions/TransactionsDeleteAction"
import { TransactionsDownloadAction } from "@/app/(manager)/transactions/toolbar/actions/TransactionsDownloadAction"
import { TransactionsEditAction } from "@/app/(manager)/transactions/toolbar/actions/TransactionsEditAction"
import { Button } from "@/components/ui/Button"
import { usePaginationParams } from "@/hooks/use-pagination-params"

export function TransactionsToolbar() {
  const { search, setSearch } = usePaginationParams()
  const [searchValue, setSearchValue] = useState<string>(search)

  const handleSearch = useCallback(() => {
    setSearch(searchValue)
  }, [setSearch, searchValue])

  return (
    <div className="flex justify-between gap-2">
      <Input
        className="max-w-xs"
        placeholder="Buscar transacciones"
        endContent={
          <Button size="sm" variant="light" isIconOnly onPress={handleSearch}>
            <Search className="size-4" />
          </Button>
        }
        value={searchValue}
        onValueChange={setSearchValue}
        onKeyUp={(event) => {
          if (event.key === "Enter") {
            handleSearch()
          }
        }}
      />
      <div className="flex gap-2">
        <TransactionsDownloadAction />
        <TransactionsEditAction />
        <TransactionsDeleteAction />
      </div>
    </div>
  )
}

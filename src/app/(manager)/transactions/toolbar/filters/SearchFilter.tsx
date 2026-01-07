"use client"

import { Input } from "@heroui/input"
import { Search } from "lucide-react"
import { useTranslations } from "next-intl"
import { useCallback, useState } from "react"
import { Button } from "@/components/ui/Button"
import { usePaginationParams } from "@/hooks/use-pagination-params"
import { useTransactionsStore } from "@/stores/useTransactionsStore"

/**
 * Search filter component for transactions toolbar
 * Modular component that manages search filtering via URL params
 *
 * Features:
 * - Search input with submit button
 * - Automatic URL sync via usePaginationParams
 * - Enter key support for quick search
 * - Clears selection when search is applied
 * - Internationalized placeholder
 *
 * @example
 * ```tsx
 * <SearchFilter />
 * ```
 */
export function SearchFilter() {
  const t = useTranslations("TransactionsPage.toolbar.filters")
  const { search, setSearch } = usePaginationParams()
  const { clearSelection } = useTransactionsStore()
  const [searchValue, setSearchValue] = useState<string>(search)

  // Handle search submission
  const handleSearch = useCallback(() => {
    setSearch(searchValue)
    clearSelection()
  }, [setSearch, clearSelection, searchValue])

  // Handle Enter key
  const handleKeyUp = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        handleSearch()
      }
    },
    [handleSearch],
  )

  return (
    <Input
      className="max-w-xs min-w-2xs"
      placeholder={t("searchPlaceholder")}
      endContent={
        <Button size="sm" variant="light" isIconOnly onPress={handleSearch}>
          <Search className="size-4" />
        </Button>
      }
      value={searchValue}
      onValueChange={setSearchValue}
      onKeyUp={handleKeyUp}
    />
  )
}

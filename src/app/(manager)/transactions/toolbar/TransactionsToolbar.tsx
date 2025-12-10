"use client"

import { TransactionsDeleteAction } from "@/app/(manager)/transactions/toolbar/actions/TransactionsDeleteAction"
import { TransactionsEditAction } from "@/app/(manager)/transactions/toolbar/actions/TransactionsEditAction"
import { FiltersPopover } from "@/app/(manager)/transactions/toolbar/filters/FiltersPopover"
import { SearchFilter } from "@/app/(manager)/transactions/toolbar/filters/SearchFilter"
import { useTransactionsStore } from "@/stores/useTransactionsStore"

export function TransactionsToolbar() {
  const { selectedKeys } = useTransactionsStore()

  return (
    <div className="flex justify-between gap-2">
      <div className="flex items-end gap-2">
        <SearchFilter />
        <FiltersPopover />
      </div>
      {selectedKeys === "all" || selectedKeys.size ? (
        <div className="flex gap-2">
          <TransactionsEditAction />
          <TransactionsDeleteAction />
        </div>
      ) : null}
    </div>
  )
}

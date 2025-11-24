import type { Key } from "@react-types/shared"
import { create } from "zustand"

interface TransactionsState {
  // State
  searchValue: string
  selectedKeys: "all" | Set<Key>
  page: number

  // Actions
  setSearchValue: (value: string) => void
  setSelectedKeys: (keys: "all" | Set<Key>) => void
  setPage: (page: number) => void
  resetFilters: () => void
  clearSelection: () => void
}

const initialState = {
  searchValue: "",
  selectedKeys: new Set<Key>([]) as "all" | Set<Key>,
  page: 1,
}

export const useTransactionsStore = create<TransactionsState>((set) => ({
  ...initialState,

  setSearchValue: (value: string) => {
    set({ searchValue: value, page: 1 }) // Reset to page 1 when searching
  },

  setSelectedKeys: (keys: "all" | Set<Key>) => {
    set({ selectedKeys: keys })
  },

  setPage: (page: number) => {
    set({ page })
  },

  resetFilters: () => {
    set({
      searchValue: initialState.searchValue,
      page: initialState.page,
    })
  },

  clearSelection: () => {
    set({ selectedKeys: new Set<Key>([]) })
  },
}))

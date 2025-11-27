import type { Key } from "@react-types/shared"
import { create } from "zustand"

/**
 * Transaction store - manages UI-specific state
 *
 * Note: Pagination and filter state are managed via URL params (see usePaginationParams hook)
 * This store only handles selection state which is UI-specific and should not be in the URL
 */
interface TransactionsState {
  // State
  selectedKeys: "all" | Set<Key>

  // Actions
  setSelectedKeys: (keys: "all" | Set<Key>) => void
  clearSelection: () => void
}

const initialState = {
  selectedKeys: new Set<Key>([]) as "all" | Set<Key>,
}

export const useTransactionsStore = create<TransactionsState>((set) => ({
  ...initialState,

  setSelectedKeys: (keys: "all" | Set<Key>) => {
    set({ selectedKeys: keys })
  },

  clearSelection: () => {
    set({ selectedKeys: new Set<Key>([]) })
  },
}))

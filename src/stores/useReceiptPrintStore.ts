import { create } from "zustand"
import type { Transaction } from "@/types/transactions"

interface ReceiptPrintState {
  isOpen: boolean
  transaction: Transaction | null
}

interface ReceiptPrintActions {
  /**
   * Open the receipt modal with the given transaction
   */
  openModal: (transaction: Transaction) => void

  /**
   * Close the receipt modal
   */
  closeModal: () => void
}

type ReceiptPrintStore = ReceiptPrintState & ReceiptPrintActions

const initialState: ReceiptPrintState = {
  isOpen: false,
  transaction: null,
}

export const useReceiptPrintStore = create<ReceiptPrintStore>((set) => ({
  ...initialState,

  openModal: (transaction: Transaction) => {
    set({
      isOpen: true,
      transaction,
    })
  },

  closeModal: () => {
    set(initialState)
  },
}))

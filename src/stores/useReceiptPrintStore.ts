import { create } from "zustand"
import type { ITransaction } from "@/types/transactions"

interface ReceiptPrintState {
  isOpen: boolean
  transaction: ITransaction | null
}

interface ReceiptPrintActions {
  /**
   * Open the receipt modal with the given transaction
   */
  openModal: (transaction: ITransaction) => void

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

  openModal: (transaction: ITransaction) => {
    set({
      isOpen: true,
      transaction,
    })
  },

  closeModal: () => {
    set(initialState)
  },
}))
